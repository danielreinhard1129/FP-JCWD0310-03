import prisma from "@/prisma"
import { PaginationQueryParams } from "@/types/pagination.type";

import { DeliveryStatus, Prisma } from "@prisma/client";

interface GetDeliveryOrdersQuery extends PaginationQueryParams {
  id: number;
  deliveryStatus: string;
  isClaimedbyDriver: number;
  latitude: number;
  longitude: number;
}

export const getDeliveryOrdersService = async (query: GetDeliveryOrdersQuery) => {
  try {
    const { page, sortBy, sortOrder, take, id, deliveryStatus, isClaimedbyDriver, latitude, longitude } = query;

    const existingUser = await prisma.user.findFirst({
      where: { id: id },
      select: { employee: true, role: true }
    })
    const whereClause: Prisma.DeliveryOrderWhereInput = {}

    if (deliveryStatus != 'all') {
      whereClause.deliveryStatus = deliveryStatus as DeliveryStatus;
    }

    if (existingUser?.role != "SUPER_ADMIN") {

      const pickupOrders = await prisma.pickupOrder.findMany({
        where: { outletId: existingUser?.employee?.outletId },
        select: { id: true }
      });

      const pickupOrderIds = pickupOrders.map(pickup => pickup.id);

      const orders = await prisma.order.findMany({
        where: { pickupOrderId: { in: pickupOrderIds } },
        select: { id: true }
      })

      const orderIds = orders.map(order => order.id)

      whereClause.orderId = { in: orderIds }

      if (existingUser?.role == "DRIVER") {
        if (deliveryStatus != String(DeliveryStatus.WAITING_FOR_DRIVER)) {
          whereClause.driverId = existingUser.employee?.id;
        }
        if (latitude != 0 && longitude != 0) {

          const deliveryOrders = await prisma.deliveryOrder.findMany({
            where: whereClause,
            include: { user: true, address: true, driver: { include: { user: true } }, order: { include: { pickupOrder: { include: { outlet: true } } } } },
          });

          const R = 6371;

          const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
            const dLat = (lat2 - lat1) * Math.PI / 180.0;
            const dLon = (lon2 - lon1) * Math.PI / 180.0;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180.0) * Math.cos(lat2 * Math.PI / 180.0) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
          };

          const sortedDeliveryOrders = deliveryOrders.map(order => {
            const address = order.address
            const realDistance = address && address.latitude && address.longitude
              ? haversineDistance(latitude, longitude, parseFloat(address.latitude), parseFloat(address.longitude))
              : Infinity;
            return { ...order, realDistance};
          }).sort((a, b) => a.realDistance - b.realDistance);

          const paginatedOrders = sortedDeliveryOrders.slice((page - 1) * take, page * take);

          const count = sortedDeliveryOrders.length;

          return {
            data: paginatedOrders,
            meta: { page, take, total: count }
          };
        }
      }
    }    

    if (Boolean(isClaimedbyDriver) == true) {
      whereClause.driverId = {
        not: null,
      }
    }

    const deliveryOrders = await prisma.deliveryOrder.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { user: true, driver: { include: { user: true } }, order: { include: { pickupOrder: { include: { outlet: true } } } } },
    });

    const count = await prisma.deliveryOrder.count({ where: whereClause });

    return {
      data: deliveryOrders,
      meta: { page, take, total: count }
    };
  } catch (error) {
    throw error
  }
}
import prisma from "@/prisma"
import { PaginationQueryParams } from "@/types/pagination.type";

import { DeliveryStatus, Prisma } from "@prisma/client";

interface GetDeliveryOrdersQuery extends PaginationQueryParams {
  id: number;
  deliveryStatus: string;
}

export const getDeliveryOrdersService = async (query: GetDeliveryOrdersQuery) => {
  try {
    const { page, sortBy, sortOrder, take, id, deliveryStatus} = query;
      
    const existingUser = await prisma.user.findFirst({
        where: { id: id },
        select: { employee: true, role: true }
      }) 

    if(existingUser?.role!="DRIVER"){
        throw new Error('Your User Role is Not Allowed to be Accessed!')
    }

    const pickupOrders = await prisma.pickupOrder.findMany({
        where: {outletId: existingUser.employee?.outletId},
        select: {id:true}
    });

    const pickupOrderIds = pickupOrders.map(pickup => pickup.id);

    const orders = await prisma.order.findMany({
        where: {pickupOrderId: {in: pickupOrderIds}},
        select: {id: true}
    })

    const orderIds = orders.map(order => order.id)
      
    const whereClause: Prisma.DeliveryOrderWhereInput = {
        orderId: {in: orderIds},
        deliveryStatus: DeliveryStatus[deliveryStatus as keyof typeof DeliveryStatus]
    }
    
    if(deliveryStatus != String(DeliveryStatus.Waiting_for_Driver)){
        whereClause.driverId = id;
      }

    const deliveryOrders = await prisma.deliveryOrder.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { user:true, driver:true },
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
import prisma from "@/prisma"
import { PaginationQueryParams } from "@/types/pagination.type";

import { DeliveryStatus, Prisma } from "@prisma/client";

interface GetDeliveryOrdersQuery extends PaginationQueryParams {
  id: number;
  deliveryStatus: string;
  isClaimedbyDriver: number;
}

export const getDeliveryOrdersService = async (query: GetDeliveryOrdersQuery) => {
  try {
    const { page, sortBy, sortOrder, take, id, deliveryStatus, isClaimedbyDriver} = query;
      
    const existingUser = await prisma.user.findFirst({
        where: { id: id },
        select: { employee: true, role: true }
      }) 
      const whereClause: Prisma.DeliveryOrderWhereInput = {}

    if(existingUser?.role!="SUPER_ADMIN"){
        
      const pickupOrders = await prisma.pickupOrder.findMany({
          where: {outletId: existingUser?.employee?.outletId},
          select: {id:true}
      });
  
      const pickupOrderIds = pickupOrders.map(pickup => pickup.id);
  
      const orders = await prisma.order.findMany({
          where: {pickupOrderId: {in: pickupOrderIds}},
          select: {id: true}
      })
  
      const orderIds = orders.map(order => order.id)

      whereClause.orderId = {in: orderIds}

      if (existingUser?.role == "DRIVER") {
        if (deliveryStatus != String(DeliveryStatus.WAITING_FOR_DRIVER)) {
          whereClause.driverId = id;
        }
      }
    }

    if (deliveryStatus != 'all') {
      whereClause.deliveryStatus = deliveryStatus as DeliveryStatus;
    }

    if (Boolean(isClaimedbyDriver)==true){
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
      include: { user:true, driver:{include:{user:true}}, order:{include:{pickupOrder: {include: {outlet: true}}}} },
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
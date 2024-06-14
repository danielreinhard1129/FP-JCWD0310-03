import prisma from "@/prisma"
import { PaginationQueryParams } from "@/types/pagination.type";

import { Prisma } from "@prisma/client";

interface GetDeliverOrdersQuery extends PaginationQueryParams {
  id: number;
}

export const getDeliverRequestsService = async (query: GetDeliverOrdersQuery) => {
  try {
    const { page, sortBy, sortOrder, take, id} = query;
    
    const existingUser = await prisma.user.findFirst({
        where: { id: id },
        select: { Employee: true, role: true }
      }) 

    if(existingUser?.role!="DRIVER"){
        throw new Error('Your User Role is Not Allowed to be Accessed!')
    }

    const pickupOrders = await prisma.pickupOrder.findMany({
        where: {outletId: existingUser.Employee?.outletId},
        select: {id:true}
    });

    const pickupOrderIds = pickupOrders.map(pickup => pickup.id);

    const orders = await prisma.order.findMany({
        where: {pickupOrderId: {in: pickupOrderIds}},
        select: {id: true}
    })

    const orderIds = orders.map(order => order.id)
      
    const whereClause: Prisma.DeliverOrderWhereInput = {
        orderId: {in: orderIds},
        deliverStatus: "Waiting_for_Driver"
    }

    const deliverOrders = await prisma.deliverOrder.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { user:true, driver:true },
    });

    const count = await prisma.deliverOrder.count({ where: whereClause });

    return {
      data: deliverOrders,
      meta: { page, take, total: count }
    };
  } catch (error) {
    throw error
  }
}
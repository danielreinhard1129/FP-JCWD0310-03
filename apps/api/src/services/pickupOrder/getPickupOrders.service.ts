import prisma from "@/prisma"
import { PaginationQueryParams } from "@/types/pagination.type";

import { Prisma } from "@prisma/client";

interface GetPickupOrdersQuery extends PaginationQueryParams {
  id: number;
}

export const getPickupOrdersService = async (query: GetPickupOrdersQuery) => {
  try {
    const { page, sortBy, sortOrder, take, id} = query;
    
    const existingUser = await prisma.user.findFirst({
        where: { id: id },
        select: { employee: true, role: true }
      }) 
      
    const whereClause: Prisma.PickupOrderWhereInput = {}

    if(existingUser?.role=="DRIVER"){
      whereClause.outletId = existingUser.employee?.outletId;
      whereClause.pickupStatus = "Waiting_for_Driver";
    }

    if(existingUser?.role=="OUTLET_ADMIN"){
      whereClause.outletId = existingUser.employee?.outletId;
      whereClause.isOrderCreated = false;
      whereClause.pickupStatus = 'Received_by_Outlet';
    }


    const pickupOrders = await prisma.pickupOrder.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { user:true, outlet:true },
    });

    const count = await prisma.pickupOrder.count({ where: whereClause });

    if (!pickupOrders) {
      throw new Error('User not Found!')
    }

    return {
      data: pickupOrders,
      meta: { page, take, total: count }
    };
  } catch (error) {
    throw error
  }
}
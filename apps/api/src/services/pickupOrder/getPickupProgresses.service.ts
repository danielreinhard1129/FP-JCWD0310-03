import prisma from "@/prisma"
import { PaginationQueryParams } from "@/types/pagination.type";

import { Prisma } from "@prisma/client";

interface GetPickupOrdersQuery extends PaginationQueryParams {
  id: number;
}

export const getPickupProgressesService = async (query: GetPickupOrdersQuery) => {
  try {
    const { page, sortBy, sortOrder, take, id} = query;
    
    const existingUser = await prisma.user.findFirst({
        where: { id: id },
        select: { Employee: true, role: true }
      }) 
    if(existingUser?.role!="DRIVER"){
        throw new Error('Your User Role is Not Allowed to be Accessed!')
    }
      
    const whereClause: Prisma.PickupOrderWhereInput = {
        outletId: existingUser.Employee?.outletId,
        pickupStatus: {
            in: ["On_The_Way_to_Client", "On_The_Way_to_Outlet"]
        },
        driverId: existingUser.Employee?.id,
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

    return {
      data: pickupOrders,
      meta: { page, take, total: count }
    };
  } catch (error) {
    throw error
  }
}
import prisma from "@/prisma";
import { PaginationQueryParams } from "@/types/pagination.type";
import { PickupStatus, Prisma } from "@prisma/client";

interface GetPickupOrdersQuery extends PaginationQueryParams {
  id: number;
  pickupStatus: string;
  isOrderCreated: number;
  isClaimedbyDriver: number;
}

export const getPickupOrdersService = async (query: GetPickupOrdersQuery) => {
  try {
    const { page, sortBy, sortOrder, pickupStatus, isOrderCreated, take, id, isClaimedbyDriver} = query;

    const existingUser = await prisma.user.findFirst({
      where: { id: id },
      select: { employee: true, role: true }
    })

    const whereClause: Prisma.PickupOrderWhereInput = {}

    if (existingUser?.role == "DRIVER") {
      whereClause.outletId = existingUser.employee?.outletId;
      if (pickupStatus != String(PickupStatus.Waiting_for_Driver)) {
        whereClause.driverId = id;
      }
    }

    if(existingUser?.role == "OUTLET_ADMIN") {
      whereClause.outletId = existingUser?.employee?.outletId;
    }

    if (pickupStatus != 'all') {
      whereClause.pickupStatus = pickupStatus as PickupStatus;
    }

    if (!Number.isNaN(isOrderCreated)) {
      whereClause.isOrderCreated = Boolean(isOrderCreated)
    }

    if (Boolean(isClaimedbyDriver)==true){
      whereClause.driverId = {
        not: null,
      }
    }
    
    

    const pickupOrders = await prisma.pickupOrder.findMany({     
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        user: true,
        outlet: true,
        driver: {
          include: {
            user: true,
          },
        },
      },
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
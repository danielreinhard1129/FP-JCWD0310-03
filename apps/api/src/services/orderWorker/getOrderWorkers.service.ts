import prisma from "@/prisma";
import { PaginationQueryParams } from "@/types/pagination.type";

import { EmployeeStation, PickupStatus, Prisma } from "@prisma/client";

interface GetOrderWorkersQuery extends PaginationQueryParams {
  id: number;
  station: string;
  isComplete: number;
}

export const getOrderWorkersService = async (query: GetOrderWorkersQuery) => {
  try {
    const { page, sortBy, sortOrder, take, id, station, isComplete } = query;

    const existingUser = await prisma.user.findFirst({
      where: { id: id },
      select: { employee: true, role: true }
    })

    const whereClause: Prisma.OrderWorkerWhereInput = {
      isComplete: Boolean(isComplete),
      workerId: id,
      station: station as EmployeeStation
    }    

    const orderWorkers = await prisma.orderWorker.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { worker: true, order: { include: { pickupOrder: { include: { user: true } } } } },
    });

    const count = await prisma.orderWorker.count({ where: whereClause });

    return {
      data: orderWorkers,
      meta: { page, take, total: count }
    };
  } catch (error) {
    throw error
  }
}
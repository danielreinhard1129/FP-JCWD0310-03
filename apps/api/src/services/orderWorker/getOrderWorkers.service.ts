import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';

import { EmployeeStation, Prisma } from '@prisma/client';

interface GetOrderWorkersQuery extends PaginationQueryParams {
  id: number;
  station: string;
  isComplete: number;
  bypassRequest: number | string;
  filterOutlet?: string | number;
}

export const getOrderWorkersService = async (query: GetOrderWorkersQuery) => {
  try {
    const {
      page,
      sortBy,
      sortOrder,
      take,
      id,
      station,
      isComplete,
      bypassRequest,
      filterOutlet
    } = query;

    const existingUser = await prisma.user.findFirst({
      where: { id: id },
      select: { employee: true, role: true },
    });

    const workers = await prisma.employee.findMany({
      where: { outletId: existingUser?.employee?.outletId },
      select: { id: true },
    });
    const workerIds = workers.map((worker) => worker.id);

    const whereClause: Prisma.OrderWorkerWhereInput = {
    };
    if (existingUser?.role == 'SUPER_ADMIN') {
      if (filterOutlet != 'all') {
        const workers = await prisma.employee.findMany({
          where: { outletId: Number(filterOutlet) },
          select: { id: true },
        });
        const workerIds = workers.map((worker) => worker.id);
        whereClause.workerId = { in: workerIds };
      }
    }

    if (existingUser?.role == 'OUTLET_ADMIN') {
      whereClause.workerId = { in: workerIds };
    }

    if (existingUser?.role == "WORKER") {
      whereClause.workerId = existingUser.employee?.id
    }

    if (station != 'all') {
      whereClause.station = station as EmployeeStation;
    }

    if (!Number.isNaN(isComplete)) {
      whereClause.isComplete = Boolean(isComplete);
    }

    if (bypassRequest != 'all') {
      whereClause.bypassRequest = Boolean(bypassRequest);
    }

    const orderWorkers = await prisma.orderWorker.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        worker: true,
        order: {
          include: { pickupOrder: { include: { user: true, outlet: true } } },
        },
      },
    });

    const count = await prisma.orderWorker.count({ where: whereClause });

    return {
      data: orderWorkers,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};

import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';

import { Prisma, Role } from '@prisma/client';

interface GetEmployeesQuery extends PaginationQueryParams {
  id: number;
  filterOutlet: string | number;
  filterRole: string;
}

export const getEmployeesService = async (query: GetEmployeesQuery) => {
  try {
    const { page, sortBy, sortOrder, take, id, filterOutlet, filterRole } = query;

    const existingUser = await prisma.user.findFirst({
      where: { id: id },
      select: { employee: true, role: true },
    });

    const activeUsers = await prisma.user.findMany({
      where: { isDelete: false },
      select: { id: true }
    })

    const activeUserIds = activeUsers.map(user => user.id);

    const whereClause: Prisma.EmployeeWhereInput = {
      userId: { in: activeUserIds }
    };

    if (existingUser?.role == Role.SUPER_ADMIN) {
      if (filterOutlet != "all") {
        whereClause.outletId = Number(filterOutlet)
      }
      if (filterRole != "all") {
        const roleUser = await prisma.user.findMany({
          where: { isDelete: false, role: filterRole as Role },
          select: { id: true }
        })
        const roleUserIds = roleUser.map(user => user.id);
        whereClause.userId = { in: roleUserIds }
      }
    }

    if (existingUser?.role != Role.SUPER_ADMIN) {
      whereClause.outletId = existingUser?.employee?.outletId
    }

    const employees = await prisma.employee.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { user: true, outlet: true },
    });

    const count = await prisma.employee.count({ where: whereClause });

    if (!employees) {
      throw new Error('User not Found!');
    }

    return {
      data: employees,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};

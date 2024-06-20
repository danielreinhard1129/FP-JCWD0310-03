import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';

import { Prisma } from '@prisma/client';

interface GetEmployeesQuery extends PaginationQueryParams {
  id: number;
}

export const getEmployeesService = async (query: GetEmployeesQuery) => {
  try {
    const { page, sortBy, sortOrder, take, id } = query;

    const existingUser = await prisma.user.findFirst({
      where: { id: id },
      select: { employee: true },
    });

    const whereClause: Prisma.EmployeeWhereInput = {
      outletId: existingUser?.employee?.outletId,
    };

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

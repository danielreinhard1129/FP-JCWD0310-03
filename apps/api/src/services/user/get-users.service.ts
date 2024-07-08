import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';

import { Prisma } from '@prisma/client';

interface GetUsersQuery extends PaginationQueryParams {
  id: number;
  search: string;
}

export const getUsersService = async (query: GetUsersQuery) => {
  try {
    const { page, sortBy, sortOrder, take, id, search } = query;

    const existingUser = await prisma.user.findFirst({
      where: { id: id }
    });

    if (!existingUser) {
      throw new Error('User not Found!');
    }

    
    const whereClause: Prisma.UserWhereInput = {
      role: 'CUSTOMER',
    };
    
    if (search !== '') {
      whereClause.fullName = {
        contains: search
      };
    }
    const users = await prisma.user.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { address: true },
    });

    const count = await prisma.user.count({ where: whereClause });

    if (!users) {
      throw new Error('User not Found!');
    }

    return {
      data: users,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};

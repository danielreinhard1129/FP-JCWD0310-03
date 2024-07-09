import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface IGetLaundryitems extends PaginationQueryParams {
  id: number;
  search?: string;
  isDelete: boolean;
}

export const getLaundryItemListService = async (query: IGetLaundryitems) => {
  try {
    const { isDelete, id, page, sortBy, sortOrder, take, search } = query;
    const whereClause: Prisma.LaundryItemWhereInput = {};

    if (search !== '') {
      whereClause.itemName = {
        contains: search?.toUpperCase(),
      };
    }
    if (isDelete == false) {
      whereClause.isDelete = false;
    }

    const laundryItems = await prisma.laundryItem.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    if (!laundryItems) {
      throw new Error('Laundry Item not Found!');
    }

    const count = await prisma.laundryItem.count({
      where: whereClause,
    });

    return { data: laundryItems, meta: { page, take, total: count } };
  } catch (error) {
    throw error;
  }
};

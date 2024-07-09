import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface IGetOutletsQuery extends PaginationQueryParams {
  id: number;
  search?: string;
  isDelete: boolean;
}

export const getOutletListService = async (query: IGetOutletsQuery) => {
  try {
    const { take, page, sortBy, sortOrder, search, id, isDelete } = query;

    const whereClause: Prisma.OutletWhereInput = {
    };

    if (search !== '') {
      whereClause.outletName = {
        contains: search?.toUpperCase(),
      };
    }

    if(isDelete==false){
      whereClause.isDelete = false
    }
 
    const outlets = await prisma.outlet.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        address: true,
        employee: true,
      },
    });

    const count = await prisma.outlet.count({
      where: whereClause,
    });

    return { data: outlets, meta: { page, take, total: count } };
  } catch (error) {
    throw error;
  }
};

import prisma from '@/prisma';
import { Prisma } from '@prisma/client';

interface GetLaundryitems {
  isDelete: boolean;
}

export const getLaundryItemListService = async (query: GetLaundryitems) => {
  try {
    const { isDelete } = query;
    const whereClause: Prisma.LaundryItemWhereInput = {
    };

    if(isDelete==false){
      whereClause.isDelete = false
    }
    
    const laundryItems = await prisma.laundryItem.findMany({
      where: whereClause,
    });

    if (!laundryItems) {
      throw new Error('Laundry Item not Found!');
    }

    return {
      data: laundryItems,
    };
  } catch (error) {
    throw error;
  }
};

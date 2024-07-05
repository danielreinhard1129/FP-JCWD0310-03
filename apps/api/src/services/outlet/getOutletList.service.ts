import prisma from '@/prisma';
import { Prisma } from '@prisma/client';

interface GetOutlet {
  take: number;
  isDelete: boolean;
}

export const getOutletListService = async (query: GetOutlet) => {
  try {
    // const outlets = await prisma.outlet.findMany({
    //   where: { isDelete: false },
    //   include: { address: true, employee: true },
    // });

    // if (!outlets) {
    //   throw new Error('Outlet not Found!');
    // }

    // return {
    //   data: outlets,
    // };
    const { take , isDelete} = query;
    const whereClause: Prisma.OutletWhereInput = {
    };

    if(isDelete==false){
      whereClause.isDelete = false
    }

    const outlets = await prisma.outlet.findMany({
      where: whereClause,
      take: take,
      include: {
        address: true,
        employee: true,
      },
    });
    const count = await prisma.outlet.count({
      where: whereClause,
    });

    return { data: outlets };
  } catch (error) {
    throw error;
  }
};

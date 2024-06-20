import prisma from "@/prisma";


export const getOutletListService = async () => {
  try {
    
    const outlets = await prisma.outlet.findMany({
      include: { address:true, employee: true },
    });

    if (!outlets) {
      throw new Error('Outlet not Found!')
    }

    return {
      data: outlets
    };
  } catch (error) {
    throw error
  }
}
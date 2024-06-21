import prisma from '@/prisma';

export const getOutletService = async (id: number) => {
  try {
    const outlet = await prisma.outlet.findFirst({
      where: { id },
      include: { address: true, employee: true },
    });

    if (outlet?.isDelete == true) {
      throw new Error('Employee account is already deleted');
    }

    if (!outlet) {
      throw new Error('Outlet not found');
    }

    return outlet;
  } catch (error) {
    throw error;
  }
};

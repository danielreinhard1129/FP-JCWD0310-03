import prisma from '@/prisma';

export const deleteOutletService = async (id: number) => {
  try {
    const outlet = await prisma.outlet.findFirst({
      where: { id },
    });

    if (!outlet) {
      throw new Error('Outlet not found !');
    }

    await prisma.outlet.update({
      where: { id },
      data: { isDelete: true, deletedAt: new Date() },
    });
  } catch (error) {
    throw error;
  }
};

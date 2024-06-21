import prisma from '@/prisma';

export const getLaundryItemService = async (id: number) => {
  try {
    const item = await prisma.laundryItem.findFirst({
      where: { id, isDelete: false },
    });

    if (!item) {
      throw new Error('Item not found');
    }

    return item;
  } catch (error) {
    throw error;
  }
};

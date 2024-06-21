import prisma from '@/prisma';

export const deleteLaundryItemService = async (id: number) => {
  try {
    const item = await prisma.laundryItem.findFirst({
      where: { id },
    });

    if (!item) {
      throw new Error('Item not found');
    }

    if (item.isDelete === true) {
      throw new Error('Item has already been deleted');
    }

    const deleteItem = await prisma.laundryItem.update({
      where: { id },
      data: { isDelete: true },
    });
  } catch (error) {
    throw error;
  }
};

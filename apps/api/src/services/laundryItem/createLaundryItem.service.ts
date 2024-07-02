import prisma from '@/prisma';
import { LaundryItem } from '@prisma/client';

export const createLaundryItemService = async (body: LaundryItem) => {
  try {
    const { itemName } = body;
    const existingItem = await prisma.laundryItem.findFirst({
      where: { itemName, isDelete: false },
    });

    if (existingItem) {
      throw new Error('Item already exist');
    }

    const deletedItem = await prisma.laundryItem.findFirst({
      where: { itemName, isDelete: true },
    });

    if (deletedItem) {
      await prisma.laundryItem.update({
        where: { id: deletedItem.id },
        data: { isDelete: false },
      });
    } else {
      const newItem = await prisma.laundryItem.create({
        data: { ...body },
      });
    }

    return { message: 'Create laundry item success !' };
  } catch (error) {
    throw error;
  }
};

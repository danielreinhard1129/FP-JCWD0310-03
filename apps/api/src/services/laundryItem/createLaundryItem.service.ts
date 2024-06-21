import prisma from '@/prisma';
import { LaundryItem } from '@prisma/client';

export const createLaundryItemService = async (body: LaundryItem) => {
  try {
    const { itemName } = body;
    const existingItem = await prisma.laundryItem.findFirst({
      where: { itemName },
    });

    if (existingItem) {
      throw new Error('Item already exist');
    }

    const newItem = await prisma.laundryItem.create({
      data: { ...body },
    });
    return { message: 'Create laundry item success !', data: newItem };
  } catch (error) {
    throw error;
  }
};

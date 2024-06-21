import prisma from '@/prisma';
import { LaundryItem } from '@prisma/client';

export const updateLaundryItemService = async (
  id: number,
  body: LaundryItem,
) => {
  try {
    const { itemName } = body;
    const item = await prisma.laundryItem.findFirst({ where: { id } });
    if (!item) {
      throw new Error('Item not found');
    }

    if (item.itemName === itemName) {
      throw new Error('Item already exist!');
    }

    const updateItem = await prisma.laundryItem.update({
      where: { id },
      data: { ...body },
    });

    console.log('dari serpis', body, id);

    return { message: 'Update laundry item success!', data: updateItem };
  } catch (error) {
    throw error;
  }
};

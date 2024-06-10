import prisma from "@/prisma";


export const getLaundryItemListService = async () => {
  try {
    
    const laundryItems = await prisma.laundryItem.findMany();

    if (!laundryItems) {
      throw new Error('Laundry Item not Found!')
    }

    return {
      data: laundryItems
    };
  } catch (error) {
    throw error
  }
}
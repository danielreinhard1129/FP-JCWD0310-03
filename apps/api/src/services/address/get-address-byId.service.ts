import prisma from '@/prisma';

export const getAddressByIdService = async (id: number) => {
  try {
    const address = await prisma.address.findMany({
      where: { id: id, isDelete: false },
    });

    if (!address) {
      throw new Error('Address not found !');
    }
    if (address[0].isDelete === true) {
      throw new Error('Address not found !');
    }

    return address;
  } catch (error) {
    throw error;
  }
};

import prisma from '@/prisma';
import { Address } from '@prisma/client';

interface FormUpdateAddressArgs {
  addressLine: string;
  city: string;
  latitude: string;
  longitude: string;
  isPrimary: boolean;
}

export const updateUserAddressService = async (
  id: number,
  body: Partial<FormUpdateAddressArgs>,
) => {
  try {
    console.log(body);

    const address = await prisma.address.findFirst({
      where: { id: id },
    });

    if (!address) {
      throw new Error('Address not found !');
    }
    if (address.isDelete === true) {
      throw new Error('Address not found !');
    }
    const existingAddress = await prisma.address.findFirst({
      where: { addressLine: body.addressLine },
    });

    if (existingAddress) {
      throw new Error('Address already exist !');
    }

    const updateAddress = await prisma.address.update({
      where: { id: address.id },
      data: {
        addressLine: body.addressLine,
        city: body.city,
        isPrimary: body.isPrimary,
        latitude: body.latitude,
        longitude: body.longitude,
      },
    });

    return { message: 'Updates address success', data: updateAddress };
  } catch (error) {
    throw error;
  }
};

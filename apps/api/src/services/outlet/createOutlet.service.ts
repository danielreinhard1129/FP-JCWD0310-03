import prisma from '@/prisma';
import { Outlet } from '@prisma/client';

interface Address {
  addressLine: string;
  city: string;
}

interface createOutletArgs
  extends Pick<Outlet, 'outletName' | 'outletType' | 'outletImage'> {
  addressLine: string;
  city: string;
  latitude: string;
  longitude: string;
}

export const createOutletService = async (body: Partial<createOutletArgs>) => {
  try {
    const { outletName, outletType, addressLine, city, latitude, longitude } =
      body;

    const existingOutletName = await prisma.outlet.findFirst({
      where: { outletName },
    });

    if (existingOutletName) {
      throw new Error('Outlet name already exist !');
    }

    const newOutlet = await prisma.$transaction(async (tx) => {
      const outlet = await tx.outlet.create({
        data: {
          outletName: outletName!,
          outletType: outletType!,
        },
      });

      await tx.address.create({
        data: {
          addressLine: addressLine!,
          city: city!,
          latitude: latitude,
          longitude: longitude,
          outletId: outlet.id,
        },
      });
      return outlet;
    });
    return {
      message: 'Create outlet success !',
      data: newOutlet,
    };
  } catch (error) {
    throw error;
  }
};

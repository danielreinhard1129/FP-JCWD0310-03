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
}

export const createOutletService = async (
  body: Partial<createOutletArgs>,
  file: Express.Multer.File,
) => {
  try {
    const { outletName, outletType, addressLine, city } = body;

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
          outletImage: `/images/${file.filename}`,
        },
      });

      await tx.address.create({
        data: {
          addressLine: addressLine!,
          city: city!,
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

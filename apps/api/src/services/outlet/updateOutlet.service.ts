import prisma from '@/prisma';
import { Employee, Outlet } from '@prisma/client';
import fs from 'fs';
import { join } from 'path';

const defaultDir = '../../../public/images';

interface UpdateOutletArgs
  extends Pick<Outlet, 'outletName' | 'outletType'> {
  addressLine: string;
  city: string;
  latitude?: string;
  longitude?: string;
}

export const updateOutletService = async (
  id: number,
  body: Partial<UpdateOutletArgs>,
  file: Express.Multer.File,
) => {
  try {
    const {
      outletName,
      outletType,
      addressLine,
      city,
      latitude,
      longitude,
    } = body;

    const outlet = await prisma.outlet.findFirst({
      where: { id },
      include: { address: true },
    });

    if (outlet?.isDelete === true) {
      throw new Error('Employee account is already deleted');
    }

    if (!outlet) {
      throw new Error('Outlet not found');
    }
    const addressId = await prisma.address.findFirst({
      where: { outletId: id },
    });


    const update = await prisma.$transaction(async (tx) => {
      const updateOutlet = await tx.outlet.update({
        where: { id },
        data: {
          outletName: outletName,
          outletType: outletType,
        },
      });

      const updateAddress = await tx.address.update({
        where: { id: addressId?.id },
        data: {
          addressLine: addressLine,
          city: city,
          latitude: latitude,
          longitude: longitude,
        },
      });
      return { updateOutlet, updateAddress };
    });

    return update;
  } catch (error) {
    const imagePath = join(__dirname, defaultDir + file?.filename);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    throw error;
  }
};

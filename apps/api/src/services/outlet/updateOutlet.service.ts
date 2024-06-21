import prisma from '@/prisma';
import { UserRole } from '@/types/user.type';
import { Employee, Outlet } from '@prisma/client';
import fs from 'fs';
import { join } from 'path';

const defaultDir = '../../../public/images';

interface UpdateOutletArgs
  extends Pick<Outlet, 'outletName' | 'outletType' | 'outletImage'> {
  addressLine: string;
  city: string;
}

export const updateOutletService = async (
  id: number,
  body: Partial<UpdateOutletArgs>,
  file: Express.Multer.File,
) => {
  try {
    const { outletName, outletType, outletImage, addressLine, city } = body;

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

    if (file) {
      body.outletImage = `/images/${file.filename}`;
      const imagePath = join(__dirname, '../../../public' + outlet.outletImage);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const update = await prisma.$transaction(async (tx) => {
      const updateOutlet = await tx.outlet.update({
        where: { id },
        data: {
          outletName: outletName,
          outletType: outletType,
          outletImage: outletImage,
        },
      });

      const updateAddress = await tx.address.update({
        where: { id: addressId?.id },
        data: {
          addressLine: addressLine,
          city: city,
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

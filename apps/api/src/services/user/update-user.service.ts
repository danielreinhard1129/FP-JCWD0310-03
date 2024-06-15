import prisma from '@/prisma';
import { User } from '@prisma/client';
import { join } from 'path';
import fs from 'fs';

const defaultDir = '../../../public/images';

export const updateUserService = async (
  id: number,
  body: Partial<User>,
  file?: Express.Multer.File,
) => {
  try {
    const { email } = body;

    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (email) {
      const userEmail = await prisma.user.findFirst({
        where: { email: { equals: email } },
      });

      if (userEmail) {
        throw new Error('Email already exist');
      }
    }

    if (file) {
      body.profilePic = `/images/${file.filename}`;
      const imagePath = join(__dirname, '../../../public' + user.profilePic);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      return await prisma.user.update({
        where: { id },
        data: { ...body },
      });
    }
  } catch (error) {
    const imagePath = join(__dirname, defaultDir + file?.filename);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    throw error;
  }
};

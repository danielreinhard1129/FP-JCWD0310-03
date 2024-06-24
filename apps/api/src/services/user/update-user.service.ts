import { NEXT_BASE_URL } from '@/config';
import { comparePassword, hashPassword } from '@/lib/bcrypt';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { appConfig } from '@/utils/config';
import { User } from '@prisma/client';
import fs from 'fs';
import { sign } from 'jsonwebtoken';
import { join } from 'path';

const defaultDir = '../../../public/images';

interface Udate extends Partial<User> {
  addressLine: string;
  city: string;
  latitude?: string;
  longitude?: string;
  isPrimary?: boolean;
}

export const updateUserService = async (
  id: number,
  body: Udate,
  file?: Express.Multer.File,
  newPassword?: string,
) => {
  try {
    const {
      email,
      password,
      addressLine,
      city,
      latitude,
      longitude,
      isPrimary,
    } = body;

    const user = await prisma.user.findFirst({
      where: { id },
      include: { address: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (newPassword && password) {
      // Periksa jika ada newPassword dan oldPassword
      const isOldPasswordValid = await comparePassword(password, user.password);

      if (!isOldPasswordValid) {
        throw new Error('Old password is incorrect');
      }

      const hashedPassword = await hashPassword(String(newPassword));
      body.password = hashedPassword;

      // newPassword = undefined;
    }

    if (email && user.email !== email) {
      const userEmail = await prisma.user.findFirst({
        where: { email: { equals: email } },
      });

      if (userEmail) {
        throw new Error('Email already exist');
      }

      const token = sign({ id: user.id }, appConfig.jwtSecretKey, {
        expiresIn: '1h',
      });

      let userToken = token;
      const expiresIn = new Date(new Date().getTime() + 1 * 60 * 60 * 1000);

      body.isVerify = false;
      body.token = userToken;
      body.tokenExpiresIn = expiresIn;

      const confirmationLink =
        NEXT_BASE_URL + `/register/verification?token=${userToken}`;
      await transporter.sendMail({
        from: 'Admin',
        to: email,
        subject: 'Verification your account',
        html: `<a href="${confirmationLink}" target="_blank">Verification yout account</a>`,
      });
    }

    if (file) {
      body.profilePic = `/images/${file.filename}`;
      const imagePath = join(__dirname, '../../../public' + user.profilePic);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const update = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id },
        data: {
          password: body.password,
          profilePic: body.profilePic,
          email: body.email,
          fullName: body.fullName,
          isVerify: body.isVerify,
          token: body.token,
          tokenExpiresIn: body.tokenExpiresIn,
        },
      });

      const existingAddress = await tx.address.findFirst({
        where: { addressLine },
      });

      if (existingAddress) {
        throw new Error('Address already exist');
      }

      await tx.address.create({
        data: {
          addressLine: addressLine,
          city: city,
          userId: id,
          latitude,
          longitude,
          isPrimary: Boolean(Number(isPrimary)),
        },
      });
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

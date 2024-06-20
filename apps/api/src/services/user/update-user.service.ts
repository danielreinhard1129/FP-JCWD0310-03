import prisma from '@/prisma';
import { User } from '@prisma/client';
import { join } from 'path';
import fs from 'fs';
import { sign } from 'jsonwebtoken';
import { appConfig } from '@/utils/config';
import { NEXT_BASE_URL } from '@/config';
import { transporter } from '@/lib/nodemailer';
import { comparePassword, hashPassword } from '@/lib/bcrypt';

const defaultDir = '../../../public/images';

export const updateUserService = async (
  id: number,
  body: Partial<User>,
  file?: Express.Multer.File,
  newPassword?: string,
) => {
  try {
    const { email, password } = body;

    const user = await prisma.user.findFirst({
      where: { id },
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
        expiresIn: '1m',
      });

      let userToken = token;
      const expiresIn = new Date(new Date().getTime() + 1 * 1000);

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

    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        password: body.password,
        profilePic: body.profilePic,
        email: body.email,
        fullName: body.fullName,
      },
    });

    return updateUser;
  } catch (error) {
    const imagePath = join(__dirname, defaultDir + file?.filename);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    throw error;
  }
};

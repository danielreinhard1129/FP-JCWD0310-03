import { NEXT_BASE_URL } from '@/config';
import { comparePassword, hashPassword } from '@/lib/bcrypt';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { appConfig } from '@/utils/config';
import { User } from '@prisma/client';
import fs from 'fs';
import { sign } from 'jsonwebtoken';
import { join } from 'path';
import path from 'path';
import Handlebars from 'handlebars';

const defaultDir = '../../../public/images';

interface Udate extends Partial<User> {
  addressLine: string;
  city: string;
  latitude?: string;
  longitude?: string;
  isPrimary?: boolean;
}

export const updateUserService = async (
  userId: number,
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
      where: { id: userId },
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

      const templatePath = path.join(
        __dirname,
        '../../../templates/verif.html',
      );
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compileTemplate = Handlebars.compile(templateSource);
      const confirmationLink =
        NEXT_BASE_URL + `/register/verification?token=${userToken}`;

      await transporter.sendMail({
        from: 'Admin',
        to: email,
        subject: 'Verification your account',
        html: compileTemplate({
          link: confirmationLink,
        }),
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
      const user = await tx.user.update({
        where: { id: userId },
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

      if (!existingAddress) {
        const address = await tx.address.create({
          data: {
            addressLine: addressLine,
            city: city,
            userId: userId,
            latitude: latitude,
            longitude: longitude,
            isPrimary: Boolean(Number(isPrimary)),
          },
        });

        return address;
      }

      return user;
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

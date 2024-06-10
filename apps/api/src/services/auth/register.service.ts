import { NEXT_BASE_URL } from '@/config';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { appConfig } from '@/utils/config';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { scheduleJob } from 'node-schedule';

export const registerService = async (body: Omit<User, 'id'>) => {
  try {
    const { email } = body;

    const existingEmail = await prisma.user.findFirst({
      where: { email: email, isVerify: true, isDelete: false },
    });

    if (existingEmail) {
      throw new Error('Email already exist');
    }

    // const unverifiedEmail = await prisma.user.findFirst({
    //   where: { email: email, isVerify: false, isDelete: false },
    // });
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await prisma.user.create({
        data: {
          ...body,
        },
      });

      const token = sign({ id: user.id }, appConfig.jwtSecretKey, {
        expiresIn: '30m',
      });
      const expiresAt = new Date(Date.now() + 5 * 1000); // 1 hour

      await tx.user.update({
        where: { id: user.id },
        data: { token: token, tokenExpiresAt: expiresAt },
      });
      const confirmationLink =
        NEXT_BASE_URL + `/register/set-profile?token=${token}`;
      await transporter.sendMail({
        from: 'Admin',
        to: email,
        subject: 'Complete your registration',
        html: `<a href="${confirmationLink}" target="_blank">Complete your regitration</a>`,
      });
      return user;
    });

    // const schedule = new Date(Date.now() + 1 * 60 * 1000);
    // scheduleJob('run every ', schedule, async () => {
    //   const regist = await prisma.user.findFirst({
    //     where: {
    //       id: newUser.id,
    //       isVerify: false,
    //     },
    //   });
    // });

    return {
      message: `Registration email has been sent to ${email}`,
    };
  } catch (error) {
    throw error;
  }
};

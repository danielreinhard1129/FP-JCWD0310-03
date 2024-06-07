import { NEXT_BASE_URL } from '@/config';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { User } from '@prisma/client';
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

    const unverifiedEmail = await prisma.user.findFirst({
      where: { email: email, isVerify: false, isDelete: false },
    });

    const newUser = await prisma.user.create({
      data: {
        ...body,
      },
    });

    // const token = sign({ id: newUser.id }, appConfig.jwtSecretKey, {
    //   expiresIn: '30m',
    // });

    const confirmationLink = NEXT_BASE_URL + `/register/verification`;
    await transporter.sendMail({
      from: 'Admin',
      to: email,
      subject: 'Verification your account',
      html: `<a href="${confirmationLink}" target="_blank">Upload payment proof</a>`,
    });

    const schedule = new Date(Date.now() + 2 * 60 * 1000);
    scheduleJob('run every ', schedule, async () => {
      const transaction = await prisma.user.findFirst({
        where: {
          id: newUser.id,
          isVerify: false,
        },
      });
    });

    return {
      message: `Verification email has been sent to ${email}`,
    };
  } catch (error) {
    throw error;
  }
};

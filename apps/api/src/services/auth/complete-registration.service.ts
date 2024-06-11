import { NEXT_BASE_URL } from '@/config';
import { hashPassword } from '@/lib/bcrypt';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { appConfig } from '@/utils/config';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

export const completeRegistrationService = async (
  body: Pick<User, 'email' | 'fullName' | 'password'>,
) => {
  try {
    const { email, password } = body;

    const existingEmail = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existingEmail) {
      throw new Error('Email already exist! ');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { ...body, password: hashedPassword },
      });

      const token = sign({ id: user.id }, appConfig.jwtSecretKey, {
        expiresIn: '30m',
      });

      let userToken = token;

      await tx.user.update({
        where: { id: user.id },
        data: { token: userToken },
      });

      const confirmationLink =
        NEXT_BASE_URL + `/register/verification?token=${userToken}`;
      await transporter.sendMail({
        from: 'Admin',
        to: email,
        subject: 'Verification your account',
        html: `<a href="${confirmationLink}" target="_blank">Verification yout account</a>`,
      });
      return { ...user, token: userToken };
    });

    return {
      message: `Verification email has been sent to ${email}`,
      data: newUser,
      token: newUser.token,
    };
  } catch (error) {
    throw error;
  }
};

import { NEXT_BASE_URL } from '@/config';
import { hashPassword } from '@/lib/bcrypt';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { appConfig } from '@/utils/config';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

interface CompleteRegistrationBody
  extends Pick<User, 'email' | 'password' | 'fullName' | 'profilePic'> {}
export const completeRegistrationService = async (
  body: CompleteRegistrationBody,
) => {
  try {
    const { email, password, fullName } = body;

    const existingEmail = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existingEmail) {
      throw new Error('Email already exist! ');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          fullName,
          password: hashedPassword,
        },
      });

      const token = sign({ id: user.id }, appConfig.jwtSecretKey, {
        expiresIn: '1m',
      });

      let userToken = token;
      const expiresIn = new Date(new Date().getTime() + 1 * 1000);

      await tx.user.update({
        where: { id: user.id },
        data: { token: userToken, tokenExpiresIn: expiresIn },
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
    };
  } catch (error) {
    throw error;
  }
};

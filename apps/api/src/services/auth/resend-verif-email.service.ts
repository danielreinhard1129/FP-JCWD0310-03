import { sign } from 'jsonwebtoken';
import prisma from '../../prisma';
import { appConfig } from '@/utils/config';
import { NEXT_BASE_URL } from '@/config';
import { transporter } from '@/lib/nodemailer';

export const ResendVerifEmail = async (id: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    if (!user) {
      throw new Error('invalid user id');
    }

    const token = sign({ id: user.id }, appConfig.jwtSecretKey, {
      expiresIn: '1h',
    });
    const expiresIn = new Date(new Date().getTime() + 1 * 60 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { token: token, tokenExpiresIn: expiresIn },
    });

    const confirmationLink =
      NEXT_BASE_URL + `/register/verification?token=${token}`;
    await transporter.sendMail({
      from: 'Admin',
      to: user.email,
      subject: 'Verification your account',
      html: `<a href="${confirmationLink}" target="_blank">Verification yout account</a>`,
    });
    return {
      message: 'Verification your account',
      data: user,
    };
  } catch (error) {
    throw error;
  }
};

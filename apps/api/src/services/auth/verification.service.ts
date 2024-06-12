import { comparePassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { appConfig } from '@/utils/config';
import { sign } from 'jsonwebtoken';

interface VerificationArgs {
  userId: number;
  password: string;
  tokenParams: string;
}
export const verificationService = async (body: VerificationArgs) => {
  try {
    const { password, tokenParams, userId } = body;
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error('incorrect password');
    }

    if (user.token !== tokenParams) {
      throw new Error('Please resend your verification email');
    }

    const verify = await prisma.user.update({
      where: { id: user.id },
      data: { isVerify: true },
    });

    // const token = sign({ id: userId }, appConfig.jwtSecretKey, {
    //   expiresIn: '2h',
    // });

    return {
      message: 'verification success !',
    };
  } catch (error) {
    throw error;
  }
};

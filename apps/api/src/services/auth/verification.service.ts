import { comparePassword } from '@/lib/bcrypt';
import prisma from '@/prisma';

interface VerificationArgs {
  password: string;
  token: string;
}
export const verificationService = async (
  body: VerificationArgs,
  userId: number,
) => {
  try {
    const { password, token } = body;
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
    if (user.token !== token) {
      throw new Error('Please resend your verification email');
    }

    const verify = await prisma.user.update({
      where: { id: user.id },
      data: { isVerify: true },
    });

    return verify;
  } catch (error) {
    throw error;
  }
};

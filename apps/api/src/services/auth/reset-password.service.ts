import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';

export const resetPasswordService = async (
  password: string,
  userId: number,
) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Account not found');
    }

    if (user && user.profilePic?.includes('googleusercontent.com')) {
      throw new Error('Please Login Using Google Account !');
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return {
      message: 'Reset password success !',
    };
  } catch (error) {
    throw error;
  }
};

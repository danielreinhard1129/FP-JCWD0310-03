import prisma from '@/prisma';

export const getUserService = async (userId: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: { address: true, employee: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw error;
  }
};

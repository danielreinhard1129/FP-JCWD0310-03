import prisma from '@/prisma';

export const getUserService = async (id: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
      include: { address: true },
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    console.log('ini user', user);
    return user
  } catch (error) {
    throw error;
  }
};

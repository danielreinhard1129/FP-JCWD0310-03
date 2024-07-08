import { comparePassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { appConfig } from '@/utils/config';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

export const loginService = async (body: Pick<User, 'email' | 'password'>) => {
  try {
    const { email, password } = body;

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      throw new Error('Incorrect email address or password !');
    }

    if (user.isDelete === true) {
      throw new Error(
        'This account has been deleted. Please contact support for more information',
      );
    }

    if (user && user.profilePic?.includes('googleusercontent.com')) {
      throw new Error('Please Login Using Google Account !');
    }
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Incorrect email address or password !');
    }

    const token = sign({ id: user.id }, appConfig.jwtSecretKey, {
      expiresIn: '2h',
    });

    return {
      message: 'Login success !',
      data: user,
      token: token,
    };
  } catch (error) {
    throw error;
  }
};
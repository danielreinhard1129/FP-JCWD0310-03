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

    console.log('user.token', user.token);
    console.log('tokenparams', token);
    if (user.token !== token) {
      throw new Error('Please resend your verification email');
    }

    // if (user.tokenExpiresIn && user.tokenExpiresIn > new Date()) {
    //   throw new Error(
    //     'Looks like your token expired. Just hit resend on that verification email!',
    //   );
    // }

    const verify = await prisma.user.update({
      where: { id: user.id },
      data: { isVerify: true },
    });

    // const token = sign({ id: userId }, appConfig.jwtSecretKey, {
    //   expiresIn: '2h',
    // });

    return verify;
  } catch (error) {
    throw error;
  }
};

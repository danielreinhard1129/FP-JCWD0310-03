import prisma from '@/prisma';
import { appConfig } from '@/utils/config';
import { OAuth2Client } from 'google-auth-library';
import { sign } from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage',
);

interface LoginGoogleArgs {
  email: string;
  name: string;
  picture: string;
}

export const getGoogleTokenService = async (code: string) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    const idToken = tokens.id_token;

    const decode = jwtDecode(idToken as string) as LoginGoogleArgs;

    const existingUser = await prisma.user.findFirst({
      where: { email: decode.email },
    });

    if (
      existingUser &&
      existingUser.profilePic &&
      existingUser.profilePic.includes('googleusercontent.com')
    ) {
      const token = sign({ id: existingUser.id }, appConfig.jwtSecretKey, {
        expiresIn: '2h',
      });

      return {
        message: 'login google success',
        data: existingUser,
        token: token,
      };
    }

    if (
      existingUser &&
      existingUser.profilePic &&
      !existingUser.profilePic.includes('googleusercontent.com')
    ) {
      throw new Error('Please login using email');
    }

    const newUser = await prisma.user.create({
      data: {
        email: decode.email,
        fullName: decode.name,
        profilePic: decode.picture,
        isVerify: true,
      },
    });

    const token = sign({ id: newUser.id }, appConfig.jwtSecretKey, {
      expiresIn: '2h',
    });

    return {
      message: 'Login by Google Success !',
      data: newUser,
      token: token,
    };
  } catch (error) {
    throw error;
  }
};

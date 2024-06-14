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

    console.log('INI DECODE', decode);

    const existingUser = await prisma.user.findFirst({
      where: { email: decode.email },
    });

    //    // Jika user ada dan memiliki profile picture dari googleusercontent, izinkan login
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

    // Jika user ada tetapi profile picture bukan dari googleusercontent, beri error
    if (
      existingUser &&
      existingUser.profilePic &&
      !existingUser.profilePic.includes('googleusercontent.com')
    ) {
      throw new Error('Please login using email');
    }

    // Jika user tidak ada di database, buat user baru
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
      message: 'login google success',
      data: newUser,
      token: token,
    };
  } catch (error) {
    throw error;
  }
};

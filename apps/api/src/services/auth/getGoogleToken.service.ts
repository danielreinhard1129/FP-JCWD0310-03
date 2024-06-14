import prisma from '@/prisma';
import { appConfig } from '@/utils/config';
import {
  OAuth2Client
} from 'google-auth-library';
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
}

export const getGoogleTokenService = async (code: string) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    const idToken = tokens.id_token;

    const decode = jwtDecode(idToken as string) as LoginGoogleArgs;

    console.log('INI DECODE', decode.email, decode.name);

    const existingEmail = await prisma.user.findFirst({
      where: { email: decode.email },
    });

    if (existingEmail) {
      throw new Error('Email already exist,Please Login with Email');
    }

    const newUser = await prisma.user.create({
      data: {
        email: decode.email,
        fullName: decode.name,
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

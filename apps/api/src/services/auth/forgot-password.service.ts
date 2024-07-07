import { NEXT_BASE_URL } from '@/config';
import { transporter } from '@/lib/nodemailer';
import { appConfig } from '@/utils/config';
import { sign } from 'jsonwebtoken';
import prisma from '../../prisma';
import { User } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';

export const forgotPasswordService = async (body: Pick<User, 'email'>) => {
  try {
    const { email } = body;
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new Error('invalid email address');
    }

    const token = sign({ id: user.id }, appConfig.jwtSecretKey, {
      expiresIn: '30m',
    });

    const link = NEXT_BASE_URL + `/reset-password?token=${token}`;

    const templatePath = path.join(
      __dirname,
      '../../../templates/forgotPassword.html',
    );
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const compileTemplate = Handlebars.compile(templateSource);

    await transporter.sendMail({
      from: 'Admin',
      to: email,
      subject: 'link reset password',
      html: compileTemplate({
        link: link,
      }),
    });

    return {
      message: 'Email has been sent to your email !',
    };
  } catch (error) {
    throw error;
  }
};

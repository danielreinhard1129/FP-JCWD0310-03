import { sign } from 'jsonwebtoken';
import prisma from '../../prisma';
import { appConfig } from '@/utils/config';
import { NEXT_BASE_URL } from '@/config';
import { transporter } from '@/lib/nodemailer';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';

export const ResendVerifEmail = async (id: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    if (!user) {
      throw new Error('invalid user id');
    }

    const token = sign({ id: user.id }, appConfig.jwtSecretKey, {
      expiresIn: '1h',
    });
    const expiresIn = new Date(new Date().getTime() + 1 * 60 * 60 * 1000);

    const verifUser = await prisma.user.update({
      where: { id: user.id },
      data: { token: token, tokenExpiresIn: expiresIn.toISOString() },
    });

    const templatePath = path.join(__dirname, '../../../templates/verif.html');
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const compileTemplate = Handlebars.compile(templateSource);
    const confirmationLink = `${NEXT_BASE_URL}/register/verification?token=${token}`;

    await transporter.sendMail({
      from: 'Admin',
      to: user.email,
      subject: 'Verify your account',
      html: compileTemplate({
        name: user.fullName,
        link: confirmationLink,
      }),
    });
    return verifUser;
  } catch (error) {
    throw error;
  }
};
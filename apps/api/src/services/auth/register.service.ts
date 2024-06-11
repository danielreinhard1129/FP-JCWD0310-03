import { NEXT_BASE_URL } from '@/config';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { User } from '@prisma/client';

export const registerService = async (body: Pick<User, 'email'>) => {
  try {
    const { email } = body;

    const existingEmail = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existingEmail) {
      throw new Error('Email already exist');
    }

    const setProfileLink =
      NEXT_BASE_URL + `/register/complete-registration?email=${email}`;
    await transporter.sendMail({
      from: 'Admin',
      to: email,
      subject: 'Complete your registration',
      html: `<a href="${setProfileLink}" target="_blank">Complete your regitration</a>`,
    });

    return {
      message: `Registration email has been sent to ${email}`,
    };
  } catch (error) {
    throw error;
  }
};

import { User } from '@prisma/client';

const defaultDir = '../../../public/images';

export const updateUserService = (
  id: number,
  body: Partial<User>,
  file?: Express.Multer.File,
) => {
    const {fullName} = body
  try {
  } catch (error) {
    throw error;
  }
};

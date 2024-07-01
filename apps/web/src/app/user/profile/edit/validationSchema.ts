import { z } from 'zod';

const MAX_FILE_SIZE = 1 * 1024 * 1024;
export const ValidationSchema = z.object({
  fullName: z
    .string({
      required_error: 'Full Name is Required.',
    })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  email: z
    .string({
      required_error: 'Email is Required',
    })
    .email(),
  profilePic: z
    .array(z.any())
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
      message: 'Each file must be less than 1 MB.',
    }),
});

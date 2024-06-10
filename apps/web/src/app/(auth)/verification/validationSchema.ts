import { z } from 'zod';

export const ValidationSchema = z.object({
  fullName: z
    .string({
      required_error: 'Full Name is Required.',
    })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  password: z
    .string({
      required_error: 'Password is Required',
    })
    .min(5, {
      message: 'Password must be at least 2 characters.',
    }),
});

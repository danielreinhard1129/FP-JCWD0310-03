import { z } from 'zod';

export const ValidationSchema = z.object({
  password: z
    .string({
      required_error: 'Password is Required',
    })
    .min(5, {
      message: 'Password must be at least 2 characters.',
    }),
});

import { z } from 'zod';

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

export const ValidationSchema = z.object({
  password: z
    .string({
      required_error: 'Password is Required',
    })
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .refine((value) => passwordRegex.test(value), {
      message:
        'Password must contain at least one uppercase letter and one special character.',
    }),
});

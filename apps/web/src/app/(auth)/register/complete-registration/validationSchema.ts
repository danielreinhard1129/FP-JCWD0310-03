import { any } from 'cypress/types/bluebird';
import { z } from 'zod';

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

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
  password: z
    .string({
      required_error: 'Password is Required',
    })
    .min(2, {
      message: 'Password must be at least 2 characters.',
    })
    .refine((value) => passwordRegex.test(value), {
      message:
        'Password must contain at least one uppercase letter and one special character.',
    }),
});

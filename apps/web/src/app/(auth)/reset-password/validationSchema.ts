import { z } from 'zod';
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

export const ValidationSchema = z
  .object({
    password: z
      .string({
        required_error: 'New Password is Required',
      })
      .min(8, {
        message: 'New Password must be at least 8 characters.',
      })
      .refine((value) => passwordRegex.test(value), {
        message:
          'New Password must contain at least one uppercase letter and one special character.',
      }),
    confirmPassword: z
      .string({
        required_error: 'Confirm Password is Required',
      })
      .min(8, {
        message: 'Confirm Password must be at least 8 characters.',
      })
      .refine((value) => passwordRegex.test(value), {
        message:
          'Confirm Password must contain at least one uppercase letter and one special character.',
      })
      
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'New Password and Confirm Password must match',
    path: ['confirmPassword'],
  });

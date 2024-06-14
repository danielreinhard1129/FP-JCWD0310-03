import { z } from 'zod';

export const ValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is Required',
    })
    .email(),
});

import { z } from 'zod';
const MAX_FILE_SIZE = 1 * 1024 * 1024;
export const ValidationSchema = z.object({
  city: z
    .string({
      required_error: 'City is Required',
    })
    .min(2, {
      message: 'City must be at least 2 characters.',
    }),
  addressLine: z
    .string({
      required_error: 'Address is Required',
    })
    .min(2, {
      message: 'Address must be at least 2 characters.',
    }),
  latitude: z
    .string({
      required_error: 'Address is Required',
    })
    .min(2, {
      message: 'Address must be at least 2 characters.',
    }),
  longitude: z
    .string({
      required_error: 'Address is Required',
    })
    .min(2, {
      message: 'Address must be at least 2 characters.',
    }),
  isPrimary: z.boolean().optional(),
});

import { z } from 'zod';
const MAX_FILE_SIZE = 1 * 1024 * 1024;
export const ValidationSchema = z.object({
  outletName: z
    .string({
      required_error: 'Outlet name is Required.',
    })
    .min(2, {
      message: 'Outlet name must be at least 2 characters.',
    }),
  outletType: z.string({
    required_error: 'Outlet type is Required',
  }),
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
});

import { OutletType } from '@/types/outlet.type';
import { z } from 'zod';

export const ValidationSchema = z.object({
  outletName: z
    .string({
      required_error: 'Full Name is Required.',
    })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  OutletType: z
    .string({
      required_error: 'Email is Required',
    })
    .email(),
  address: z
    .array(
      z.object({
        addressLine: z
          .string({
            required_error: 'Address Line is required.',
          })
          .min(1, {
            message: 'Address Line must not be empty.',
          }),
        city: z
          .string({
            required_error: 'City is required.',
          })
          .min(1, {
            message: 'City must not be empty.',
          }),
      }),
    )
    .min(1, {
      message: 'At least one address is required.',
    }),
});

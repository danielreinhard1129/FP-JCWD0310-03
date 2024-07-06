import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

export const ValidationSchemaSuperAdmin = z.object({
    fullName: z.string({
        required_error: "Full Name is Required.",
    }).min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string({
        required_error: "Email is Required",
    }).email(),
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
    role: z.string({
        required_error: "Please select an role to display.",
    }).min(1, {
        message: "Please select an role to display.",
    }),    
})

export const ValidationSchemaOutletAdmin = z.object({
    fullName: z.string({
        required_error: "Full Name is Required.",
    }).min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string({
        required_error: "Email is Required",
    }).email(),
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
    role: z.string({
        required_error: "Please select an role to display.",
    }).min(1, {
        message: "Please select an role to display.",
    }),
    outletId: z.string({
        required_error: "Please select an role to display.",
    }).min(1, {
        message: "Please select an role to display.",
    }),
    workShift: z.string({
        required_error: "Please select an role to display.",
    }).min(1, {
        message: "Please select an role to display.",
    }),
})

export const ValidationSchemaWorker = z.object({
    fullName: z.string({
        required_error: "Full Name is Required.",
    }).min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string({
        required_error: "Email is Required",
    }).email(),
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
    role: z.string({
        required_error: "Please select an role to display.",
    }).min(1, {
        message: "Please select an role to display.",
    }),
    outletId: z.string({
        required_error: "Please select an role to display.",
    }).min(1, {
        message: "Please select an role to display.",
    }),
    workShift: z.string({
        required_error: "Please select an role to display.",
    }).min(1, {
        message: "Please select an role to display.",
    }),
    station: z.string({
        required_error: "Please select an role to display.",
    }).min(1, {
        message: "Please select an role to display.",
    }),
})

export const ValidationSchemaDriver = z.object({
    fullName: z.string({
        required_error: "Full Name is Required.",
    }).min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string({
        required_error: "Email is Required",
    }).email(),
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
    role: z.string({
        required_error: "Please select an role to display.",
    }).min(1, {
        message: "Please select an role to display.",
    }),
    outletId: z.string({
        required_error: "Please select an role to display.",
    }).min(1, {
        message: "Please select an role to display.",
    }),
})


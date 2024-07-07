import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const completeRegisterValidator = [
  body('email')
    .notEmpty()
    .withMessage('Email is required.')
    .custom(async (value) => {
      const existingUser = await prisma.user.findFirst({
        where: { email: value },
      });
      if (existingUser) {
        throw new Error('E-mail already in use');
      }
    }),

  body('fullName').notEmpty().withMessage('Full Name is required.'),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      'Password must be at least 8 characters long and contains at least 1 of each of the following: lowercase, uppercase, number, special character.',
    ),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];

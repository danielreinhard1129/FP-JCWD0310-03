import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult, CustomValidator } from 'express-validator';

const passwordValidator = body('password')
  .notEmpty()
  .withMessage('Password is required.')
  .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
  })
  .withMessage(
    'Password must be at least 8 characters long and contains at least 1 of each of the following: lowercase, uppercase, number, special character.'
  );

const roleValidator: CustomValidator = async (role, { req }) => {
  const validRoles = ['SUPER_ADMIN', 'OUTLET_ADMIN', 'WORKER', 'DRIVER'];
  if (!validRoles.includes(role)) {
    throw new Error('Invalid role.');
  }

  if (role === 'OUTLET_ADMIN' || role === 'WORKER' || role === 'DRIVER') {
    if (!req.body.outletId) {
      throw new Error('Outlet ID is required.');
    }
  }

  if (role === 'OUTLET_ADMIN' || role === 'WORKER') {
    if (!req.body.workShift) {
      throw new Error('Work Shift is required.');
    }
  }

  if (role === 'WORKER') {
    if (!req.body.station) {
      throw new Error('Station is required.');
    }
  }

  return true;
};

export const addEmployeeValidator = [
  body('email')
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Invalid email format.')
    .custom(async (value) => {
      const existingUser = await prisma.user.findFirst({
        where: { email: value },
      });
      if (existingUser) {
        throw new Error('E-mail already in use');
      }
    }),

  body('fullName')
    .notEmpty()
    .withMessage('Full Name is required.')
    .isLength({ min: 2 })
    .withMessage('Full Name must be at least 2 characters long.'),

  passwordValidator,

  body('role')
    .notEmpty()
    .withMessage('Role is required.')
    .custom(roleValidator),

  body('outletId').optional().notEmpty().withMessage('Outlet ID is required.'),

  body('workShift').optional().notEmpty().withMessage('Work Shift is required.'),

  body('station').optional().notEmpty().withMessage('Station is required.'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];
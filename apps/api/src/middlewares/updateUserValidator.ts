import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult, CustomValidator } from 'express-validator';

export const updateUserValidator = [
  body('fullName')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Full Name must be at least 2 characters long.'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('newPassword')
    .optional()
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
  body('addressLine')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('Address is required'),
  body('city').optional().isString().notEmpty().withMessage('City is required'),
  body('latitude')
    .optional()
    .isNumeric()
    .withMessage('Latitude must be a numeric value'),
  body('longitude')
    .optional()
    .isNumeric()
    .withMessage('Longitude must be a numeric value'),
  body('isPrimary')
    .optional()
    .isBoolean()
    .withMessage('isPrimary must be a boolean value'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];

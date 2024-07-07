import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult, CustomValidator } from 'express-validator';

export const updateEmployeeValidator = [
    body('fullName')
      .optional()
      .isLength({ min: 2 })
      .withMessage('Full Name must be at least 2 characters long.'),
  
    body('outletId')
      .optional()
      .custom(async (value, { req }) => {
        if (req.body.role && (req.body.role === 'OUTLET_ADMIN' || req.body.role === 'WORKER' || req.body.role === 'DRIVER') && !value) {
          throw new Error('Outlet ID is required for the selected role.');
        }
        return true;
      }),
  
    body('workShift')
      .optional()
      .custom((value, { req }) => {
        if (req.body.role && (req.body.role === 'OUTLET_ADMIN' || req.body.role === 'WORKER') && !value) {
          throw new Error('Work Shift is required for the selected role.');
        }
        return true;
      }),
  
    body('station')
      .optional()
      .custom((value, { req }) => {
        if (req.body.role && req.body.role === 'WORKER' && !value) {
          throw new Error('Station is required for the selected role.');
        }
        return true;
      }),
  
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
  
      next();
    },
  ];
  
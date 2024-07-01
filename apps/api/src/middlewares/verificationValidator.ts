import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const verificationValidator = [
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      // returnScore: false,
      // pointsPerUnique: 1,
      // pointsPerRepeat: 0.5,
      // pointsForContainingLower: 10,
      // pointsForContainingUpper: 10,
      // pointsForContainingNumber: 10,
      // pointsForContainingSymbol: 10,
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

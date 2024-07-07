import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const baseValidation = [
    body('pickupNumber')
        .notEmpty()
        .withMessage('Pickup Number is required.')
        .isString()
        .withMessage('Pickup Number must be a string.'),
    body('weight')
        .notEmpty()
        .withMessage('Weight is required.')
        .isNumeric()
        .withMessage('Weight must be a number.'),
];

const dynamicValidation = (req: Request) => {
    const items = req.body.orderItem;
    const validations: any[] = [];

    if (!Array.isArray(items) || items.length === 0) {
        validations.push(body('orderItem').custom(() => {
            throw new Error('At least one Laundry Item is required.');
        }));
    } else {
        items.forEach((item: any, index: number) => {
            validations.push(
                body(`orderItem[${index}].laundryItemId`)
                    .notEmpty()
                    .withMessage(`Laundry Item at position ${index + 1} is required.`)
                    .isString()
                    .withMessage(`Laundry Item at position ${index + 1} must be a string.`),
                body(`orderItem[${index}].qty`)
                    .notEmpty()
                    .withMessage(`Quantity at position ${index + 1} is required.`)
                    .isNumeric()
                    .withMessage(`Quantity at position ${index + 1} must be a number.`),
            );
        });
    }

    return validations;
};

export const createOrderValidator = [
    ...baseValidation,
    (req: Request, res: Response, next: NextFunction) => {
        const dynamicValidations = dynamicValidation(req);
        Promise.all(dynamicValidations.map(validation => validation.run(req)))
            .then(() => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                next();
            })
            .catch(next);
    }
];

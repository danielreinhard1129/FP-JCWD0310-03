import { createPaymentService } from '@/services/payment/createPayment.service';
import { NextFunction, Request, Response } from 'express';


export class PaymentController {
    async createPaymentController(req: Request, res: Response, next: NextFunction) {
        try {
          const result = await createPaymentService(req.body);
          res.status(200).send(result);
        } catch (error) {
          next(error);
        }
      }
}
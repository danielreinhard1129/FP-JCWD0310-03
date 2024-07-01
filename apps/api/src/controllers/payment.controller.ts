import { createPaymentService } from '@/services/payment/createPayment.service';
import { getPaymentService } from '@/services/payment/getPayment.service';
import { updatePaymentService } from '@/services/payment/updatePayment.service';
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
  async getPaymentController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        orderId: parseInt(req.query.orderId as string),        
      };
      const result = await getPaymentService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updatePaymentController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updatePaymentService(req.body);
      res.status(200).json({
        status: 'success',
        message: 'OK'
      })
    } catch (error) {
      next(error);
    }
  }
}
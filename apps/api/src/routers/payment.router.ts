
import { PaymentController } from '@/controllers/payment.controller';
import { Router } from 'express';

export class PaymentRouter {
  private router: Router;
  private paymentController: PaymentController;

  constructor() {
    this.paymentController = new PaymentController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.paymentController.createPaymentController);
  }

  getRouter(): Router {
    return this.router;
  }
}
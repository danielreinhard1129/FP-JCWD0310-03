
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
    this.router.get('/order', this.paymentController.getPaymentController);
    this.router.get('/report-chart', this.paymentController.getPaymentChartController);
    this.router.post('/', this.paymentController.createPaymentController);
    this.router.post('/midtrans-callback', this.paymentController.updatePaymentController);
  }

  getRouter(): Router {
    return this.router;
  }
}
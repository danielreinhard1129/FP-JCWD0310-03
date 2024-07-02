
import { PaymentController } from '@/controllers/payment.controller';
import { verifyToken } from '@/middlewares/verifyToken';
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
    this.router.get('/order',verifyToken, this.paymentController.getPaymentController);
    this.router.get('/report-chart',verifyToken, this.paymentController.getPaymentChartController);
    this.router.post('/',verifyToken, this.paymentController.createPaymentController);
    this.router.post('/midtrans-callback',verifyToken, this.paymentController.updatePaymentController);
  }

  getRouter(): Router {
    return this.router;
  }
}
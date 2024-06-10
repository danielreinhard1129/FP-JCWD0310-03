//import { verifyToken } from '@/lib/jwt';

import { OrderController } from '@/controllers/order.controller';
import { Router } from 'express';

export class OrderRouter {
  private router: Router;
  private orderController: OrderController;

  constructor() {
    this.orderController = new OrderController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.orderController.getOrdersController);
    this.router.post('/create-order', this.orderController.CreateOrderController);
  }

  getRouter(): Router {
    return this.router;
  }
}
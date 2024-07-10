import { OrderController } from '@/controllers/order.controller';
import { createOrderValidator } from '@/middlewares/createOrderValidator';
import { verifyToken } from '@/middlewares/verifyToken';
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
    this.router.get('/', verifyToken, this.orderController.getOrdersController);
    this.router.get(
      '/:id',
      verifyToken,
      this.orderController.getOrderController,
    );
    this.router.post(
      '/',
      verifyToken,
      createOrderValidator,
      this.orderController.createOrderController,
    );
    this.router.patch(
      '/',
      verifyToken,
      this.orderController.updateOrderStatusController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

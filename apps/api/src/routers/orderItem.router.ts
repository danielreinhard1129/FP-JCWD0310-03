
import { OrderItemController } from '@/controllers/orderItem.controller';
import { OrderWorkerController } from '@/controllers/orderWorker.controller';
import { Router } from 'express';

export class OrderItemRouter {
  private router: Router;
  private orderItemController: OrderItemController;

  constructor() {
    this.orderItemController = new OrderItemController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.orderItemController.getOrderItemsController);
  }

  getRouter(): Router {
    return this.router;
  }
}
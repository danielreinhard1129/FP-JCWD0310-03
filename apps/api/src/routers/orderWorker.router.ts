
import { OrderWorkerController } from '@/controllers/orderWorker.controller';
import { Router } from 'express';

export class OrderWorkerRouter {
  private router: Router;
  private orderWorkerController: OrderWorkerController;

  constructor() {
    this.orderWorkerController = new OrderWorkerController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.orderWorkerController.getOrderWorkersController);
  }

  getRouter(): Router {
    return this.router;
  }
}
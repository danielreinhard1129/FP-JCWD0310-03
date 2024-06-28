import { DeliveryOrderController } from '@/controllers/deliveryOrder.controller';
import { Router } from 'express';

export class DeliveryOrderRouter {
  private router: Router;
  private deliveryOrderController: DeliveryOrderController;

  constructor() {
    this.deliveryOrderController = new DeliveryOrderController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.deliveryOrderController.getDeliveryOrdersController);
    this.router.post('/', this.deliveryOrderController.createDeliveryOrderController);
    this.router.patch('/', this.deliveryOrderController.updateDeliveryOrderController);
  }

  getRouter(): Router {
    return this.router;
  }
}
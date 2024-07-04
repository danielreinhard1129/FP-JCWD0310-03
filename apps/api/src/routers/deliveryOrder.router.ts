import { DeliveryOrderController } from '@/controllers/deliveryOrder.controller';
import { verifyToken } from '@/middlewares/verifyToken';
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
    this.router.get(
      '/',
      verifyToken,
      this.deliveryOrderController.getDeliveryOrdersController,
    );
    this.router.get(
      '/:id',
      verifyToken,
      this.deliveryOrderController.getDeliveryOrderController,
    );
    this.router.post(
      '/',
      verifyToken,
      this.deliveryOrderController.createDeliveryOrderController,
    );
    this.router.patch(
      '/',
      verifyToken,
      this.deliveryOrderController.updateDeliveryOrderController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

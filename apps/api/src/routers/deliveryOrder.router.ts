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
    this.router.get('/request', this.deliveryOrderController.getDeliveryRequestsController);
    this.router.get('/progresses', this.deliveryOrderController.getDeliveryProgressesController);
    this.router.get('/history', this.deliveryOrderController.getDeliveryHistoriesController);
    this.router.patch('/request', this.deliveryOrderController.updateDeliveryRequestController);
    this.router.patch('/to-client', this.deliveryOrderController.updateDeliveryToClientController);
    this.router.patch('/to-outlet', this.deliveryOrderController.updateDeliveryToOutletController);
  }

  getRouter(): Router {
    return this.router;
  }
}
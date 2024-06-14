import { DeliverOrderController } from '@/controllers/deliverOrder.controller';
import { Router } from 'express';

export class DeliverOrderRouter {
  private router: Router;
  private deliverOrderController: DeliverOrderController;

  constructor() {
    this.deliverOrderController = new DeliverOrderController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/request', this.deliverOrderController.getDeliverRequestsController);
    this.router.get('/progresses', this.deliverOrderController.getDeliverProgressesController);
    this.router.patch('/request', this.deliverOrderController.updateDeliverRequestController);
    this.router.patch('/to-client', this.deliverOrderController.updateDeliverToClientController);
    this.router.patch('/to-outlet', this.deliverOrderController.updateDeliverToOutletController);
  }

  getRouter(): Router {
    return this.router;
  }
}
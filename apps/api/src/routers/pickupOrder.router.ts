//import { verifyToken } from '@/lib/jwt';
import { PickupOrderController } from '@/controllers/pickupOrder.controller';
import { Router } from 'express';

export class PickupOrderRouter {
  private router: Router;
  private pickupOrderController: PickupOrderController;

  constructor() {
    this.pickupOrderController = new PickupOrderController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.pickupOrderController.getPickupOrdersController);
    this.router.get('/request', this.pickupOrderController.getPickupRequestsController);
    this.router.get('/progresses', this.pickupOrderController.getPickupProgressesController);
    this.router.get('/history', this.pickupOrderController.getPickupHistorysController);
    this.router.get('/:id', this.pickupOrderController.getPickupOrderController);
    this.router.patch('/request', this.pickupOrderController.updatePickupRequestController);
    this.router.patch('/to-client', this.pickupOrderController.updatePickupToClientController);
    this.router.patch('/to-outlet', this.pickupOrderController.updatePickupToOutletController);
  }

  getRouter(): Router {
    return this.router;
  }
}
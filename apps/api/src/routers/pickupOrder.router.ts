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
    this.router.get('/:id', this.pickupOrderController.getPickupOrderController);
    this.router.post('/', this.pickupOrderController.createPickupOrderController);
    this.router.patch('/', this.pickupOrderController.updatePickupOrderController);
  }

  getRouter(): Router {
    return this.router;
  }
}
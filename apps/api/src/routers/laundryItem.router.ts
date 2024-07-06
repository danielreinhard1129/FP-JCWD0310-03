//import { verifyToken } from '@/lib/jwt';
import { LaundryItemController } from '@/controllers/laundryItem.controller';
import { verifyToken } from '@/middlewares/verifyToken';
import { Router } from 'express';

export class LaundryItemRouter {
  private router: Router;
  private laundryItemController: LaundryItemController;

  constructor() {
    this.laundryItemController = new LaundryItemController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      this.laundryItemController.creaeteLaundryItemController,
    );
    this.router.get(
      '/',
      verifyToken,
      this.laundryItemController.getLaundryItemListController,
    );
    this.router.get(
      '/:id',
      this.laundryItemController.getLaundryItemController,
    );
    this.router.patch(
      '/:id',
      this.laundryItemController.updateLaundryItemController,
    );
    this.router.delete(
      '/:id',
      this.laundryItemController.deleteLaundryController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

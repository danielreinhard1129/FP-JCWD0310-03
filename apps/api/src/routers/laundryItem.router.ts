
//import { verifyToken } from '@/lib/jwt';
import { LaundryItemController } from '@/controllers/laundryItem.controller';
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
    this.router.get('/', this.laundryItemController.getLaundryItemListController);
  }

  getRouter(): Router {
    return this.router;
  }
}
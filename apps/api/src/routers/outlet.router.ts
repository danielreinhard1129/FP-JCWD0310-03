
//import { verifyToken } from '@/lib/jwt';
import { OutletController } from '@/controllers/outlet.controller';
import { Router } from 'express';

export class OutletRouter {
  private router: Router;
  private outletController: OutletController;

  constructor() {
    this.outletController = new OutletController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/outletlist', this.outletController.getOutletListController);
  }

  getRouter(): Router {
    return this.router;
  }
}
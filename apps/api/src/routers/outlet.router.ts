//import { verifyToken } from '@/lib/jwt';
import { OutletController } from '@/controllers/outlet.controller';
import { uploader } from '@/lib/uploader';
import { verifyToken } from '@/middlewares/verifyToken';
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
    this.router.post(
      '/',
      verifyToken,
      this.outletController.createOutletController,
    );
    this.router.get(
      '/',
      verifyToken,
      this.outletController.getOutletListController,
    );
    this.router.get(
      '/:id',
      verifyToken,
      this.outletController.getOutletController,
    );
    this.router.patch(
      '/:id',
      verifyToken,
      this.outletController.updateOutletController,
    );
    this.router.delete(
      '/:id',
      verifyToken,
      this.outletController.deleteOutletController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

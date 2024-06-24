//import { verifyToken } from '@/lib/jwt';
import { OutletController } from '@/controllers/outlet.controller';
import { uploader } from '@/lib/uploader';
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
    this.router.post('/', this.outletController.createOutletController);
    this.router.get('/', this.outletController.getOutletListController);
    this.router.get('/:id', this.outletController.getOutletController);
    this.router.patch(
      '/:id',
      uploader('IMG', '/images').array('outletImage', 1),
      this.outletController.updateOutletController,
    );
    this.router.delete('/:id', this.outletController.deleteOutletController);
  }

  getRouter(): Router {
    return this.router;
  }
}

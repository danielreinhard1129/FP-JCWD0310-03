import { AddressController } from '@/controllers/address.controller';
import { AuthController } from '@/controllers/auth.controllers';
import { UserController } from '@/controllers/user.controllers';
import { uploader } from '@/lib/uploader';
import { verifyToken } from '@/middlewares/verifyToken';
import { Router } from 'express';

export class AddressRouter {
  private router: Router;
  private addressController: AddressController;

  constructor() {
    this.addressController = new AddressController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/user/:id',
      verifyToken,
      this.addressController.getUserAddressController,
    );
    this.router.get('/:id', verifyToken, this.addressController.getAddressById);
    this.router.patch(
      '/:id',
      verifyToken,
      this.addressController.updateUserAddressController,
    );
    this.router.delete(
      '/:id',
      verifyToken,
      this.addressController.deleteUserAddressController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

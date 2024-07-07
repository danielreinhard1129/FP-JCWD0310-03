import { AuthController } from '@/controllers/auth.controllers';
import { UserController } from '@/controllers/user.controllers';
import { uploader } from '@/lib/uploader';
import { updateUserValidator } from '@/middlewares/updateUserValidator';
import { verifyToken } from '@/middlewares/verifyToken';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.patch(
      '/profile',
      verifyToken,
      updateUserValidator,
      uploader('IMG', '/images').array('profilePic', 1),
      this.userController.updateUserController,
    );
    this.router.get(
      '/profile',
      verifyToken,
      this.userController.getUserController,
    );
    this.router.get('/', verifyToken, this.userController.getUsersController);
  }

  getRouter(): Router {
    return this.router;
  }
}

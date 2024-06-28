import { AuthController } from '@/controllers/auth.controllers';
import { UserController } from '@/controllers/user.controllers';
import { uploader } from '@/lib/uploader';
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
      '/profile/:id',
      verifyToken,
      uploader('IMG', '/images').array('profilePic', 1),
      this.userController.updateUserController,
    );
    this.router.get(
      '/',
      verifyToken,
      this.userController.getUsersController,
    );
    this.router.get(
      '/profile/:id',
      verifyToken,
      this.userController.getUserController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

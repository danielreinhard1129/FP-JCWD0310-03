import { AuthController } from '@/controllers/auth.controllers';
import { UserController } from '@/controllers/user.controllers';
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
    this.router.get(
      '/profile/:id',
      this.userController.getUserController,
    );

    // this.router.get('/:id', this.authController.getUserController);
  }

  getRouter(): Router {
    return this.router;
  }
}

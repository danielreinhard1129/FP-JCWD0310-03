import { AuthController } from '@/controllers/auth.controllers';
import { uploader } from '@/lib/uploader';
import { completeRegisterValidator } from '@/middlewares/completeRegistValidator';
import { loginValidator } from '@/middlewares/loginValidator';
import { registerValidator } from '@/middlewares/registerValidator';
import { verificationValidator } from '@/middlewares/verificationValidator';
import { verifyToken } from '@/middlewares/verifyToken';
import { Router } from 'express';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/verification',
      verifyToken,
      verificationValidator,
      this.authController.verificationController,
    );

    this.router.patch(
      '/resend-verif-email',
      verifyToken,
      this.authController.resendVerifEmailController,
    );

    this.router.post(
      '/register',
      registerValidator,
      this.authController.registerController,
    );

    this.router.post(
      '/complete-registration',
      completeRegisterValidator,
      this.authController.completeRegistrationController,
    );

    this.router.post(
      '/login',
      loginValidator,
      this.authController.loginController,
    );

    this.router.post('/google', this.authController.getGoogleTokenController);

    this.router.post(
      '/forgot-password',
      this.authController.forgotPasswordController,
    );

    this.router.patch(
      '/reset-password',
      verifyToken,
      this.authController.resetPasswordController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

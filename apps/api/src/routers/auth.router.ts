import { AuthController } from '@/controllers/auth.controllers';
import { uploader } from '@/lib/uploader';
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
      this.authController.verificationController,
    );
    this.router.patch(
      '/resend-verif-email',
      verifyToken,
      this.authController.resendVerifEmailController,
    );
    this.router.post('/register', this.authController.registerController);
    this.router.post(
      '/complete-registration',
      uploader('IMG', '/images').array('profilePic', 1),
      this.authController.completeRegistrationController,
    );
    this.router.post('/login', this.authController.loginController);
    this.router.post('/google', this.authController.getGoogleTokenController);
    // this.router.get(
    //   '/keep-login',
    //   verifyToken,
    //   this.authController.keepLoginController,
    // );
    // this.router.post(
    //   '/forgot-password',
    //   this.authController.forgotPasswordController,
    // );
    // this.router.patch(
    //   '/reset-password',
    //   verifyToken,
    //   this.authController.resetPasswordController,
    // );
    // this.router.get('/:id', this.authController.getUserController);
  }

  getRouter(): Router {
    return this.router;
  }
}

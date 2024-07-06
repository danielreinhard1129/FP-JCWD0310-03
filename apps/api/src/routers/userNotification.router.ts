import { UserNotificationController } from '@/controllers/userNotification.controller';
import { verifyToken } from '@/middlewares/verifyToken';
import { Router } from 'express';

export class UserNotificationRouter {
  private router: Router;
  private userNotificationController: UserNotificationController;

  constructor() {
    this.userNotificationController = new UserNotificationController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      verifyToken,
      this.userNotificationController.getUserNotificationsController,
    );
    this.router.patch(
      '/',
      verifyToken,
      this.userNotificationController.updateUserNotificationController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

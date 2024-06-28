import { UserNotificationController } from '@/controllers/userNotification.controller';
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
    this.router.get('/', this.userNotificationController.getUserNotificationsController);
    this.router.patch('/', this.userNotificationController.updateUserNotificationController);
  }

  getRouter(): Router {
    return this.router;
  }
}
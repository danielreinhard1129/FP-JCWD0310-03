import { getUserNotificationsService } from '@/services/userNotification/getUserNotifications.service';
import { updateUserNotificationService } from '@/services/userNotification/updateUserNotifications.service';
import { NextFunction, Request, Response } from 'express';

export class UserNotificationController {
  async getUserNotificationsController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = {
        userId: parseInt(res.locals.user.id as string),
      };

      const result = await getUserNotificationsService(query);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateUserNotificationController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await updateUserNotificationService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

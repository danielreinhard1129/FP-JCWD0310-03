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
        // userId: parseInt(req.query.userId as string),
        userId: parseInt(res.locals.user.id as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: (req.query.sortOrder as string) || 'asc',
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
      const query = {
        id: parseInt(res.locals.user.id as string),
        ...req.body
      }
      const result = await updateUserNotificationService(query);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

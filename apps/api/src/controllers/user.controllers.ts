import { getUserService } from '@/services/user/get-user.service';
import { updateUserService } from '@/services/user/update-user.service';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  async getUserController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.user.id;

      const result = await getUserService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateUserController(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.user.id;
      const files = req.files as Express.Multer.File[];
      const newPassword = req.body.newPassword;

      const result = await updateUserService(
        user,
        req.body,
        files[0],
        newPassword,
      );

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

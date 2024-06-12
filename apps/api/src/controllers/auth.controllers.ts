import { completeRegistrationService } from '@/services/auth/complete-registration.service';
import { getGoogleTokenService } from '@/services/auth/getGoogleToken.service';

import { loginService } from '@/services/auth/login.service';
import { registerService } from '@/services/auth/register.service';
import { verificationService } from '@/services/auth/verification.service';
import { NextFunction, Request, Response } from 'express';

export class AuthController {
  // REGISTER
  async registerController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerService(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // COMPLETE-REGISTER
  async completeRegistrationController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      // console.log(req.body);

      const result = await completeRegistrationService(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // LOGIN
  async loginController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // GET GOOGLE TOKEN
  async getGoogleTokenController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { code } = req.body;
      const result = await getGoogleTokenService(code);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //Verifikasi
  async verificationController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.body.user.id;
      const tokenParams = req.headers.authorization?.split(' ')[1] || '';
      const { password } = req.body;

      const result = await verificationService({
        userId,
        password,
        tokenParams,
      });
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //   // FORGOT-PASSWORD
  //   async forgotPasswordController(
  //     req: Request,
  //     res: Response,
  //     next: NextFunction,
  //   ) {
  //     try {
  //       const result = await forgotPasswordService(req.body);

  //       return res.status(200).send(result);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   // RESET PASSWORD
  //   async resetPasswordController(
  //     req: Request,
  //     res: Response,
  //     next: NextFunction,
  //   ) {
  //     try {
  //       const userId = Number(req.body.user.id);
  //       const password = req.body.password;
  //       const result = await resetPasswordService(userId, password);

  //       return res.status(200).send(result);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   // GET USER
  //   async getUserController(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const id = req.params.id;
  //       const result = await getUserService(Number(id));

  //       return res.status(200).send(result);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
}

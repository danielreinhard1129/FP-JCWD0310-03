import { completeRegistrationService } from '@/services/auth/complete-registration.service';
import { forgotPasswordService } from '@/services/auth/forgot-password.service';
import { getGoogleTokenService } from '@/services/auth/getGoogleToken.service';

import { loginService } from '@/services/auth/login.service';
import { registerService } from '@/services/auth/register.service';
import { ResendVerifEmail } from '@/services/auth/resend-verif-email.service';
import { resetPasswordService } from '@/services/auth/reset-password.service';
import { verificationService } from '@/services/auth/verification.service';
import { NextFunction, Request, Response } from 'express';

export class AuthController {
  // REGISTER
  async registerController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerService(req.body);

      return res.status(200).send(result);
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
      const result = await completeRegistrationService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // LOGIN
  async loginController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);

      return res.status(200).send(result);
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
      return res.status(200).send(result);
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
      // const userId = req.body.user.id;
      // const tokenParams = req.body.token;
      // const { password } = req.body;

      // const result = await verificationService({
      //   userId,
      //   password,
      //   tokenParams,
      // });

      const userId = Number(req.body.user.id);
      const password = req.body.password;
      const result = await verificationService(password, userId);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async resendVerifEmailController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.body.user.id;

      const result = await ResendVerifEmail(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // FORGOT-PASSWORD
  async forgotPasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await forgotPasswordService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // RESET PASSWORD
  async resetPasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(req.body.user.id);
      const password = req.body.password;
      const result = await resetPasswordService(password, userId);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

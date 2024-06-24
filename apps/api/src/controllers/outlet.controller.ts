import { createOutletService } from '@/services/outlet/createOutlet.service';
import { deleteOutletService } from '@/services/outlet/deleteOutlet.service';
import { getOutletService } from '@/services/outlet/getOutlet.service';
import { getOutletListService } from '@/services/outlet/getOutletList.service';
import { updateOutletService } from '@/services/outlet/updateOutlet.service';
import { NextFunction, Request, Response } from 'express';

export class OutletController {
  async createOutletController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createOutletService(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getOutletListController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await getOutletListService();
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getOutletController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await getOutletService(Number(id));
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateOutletController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;
      const files = req.files as Express.Multer.File[];
      const result = await updateOutletService(Number(id), req.body, files[0]);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async deleteOutletController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;
      const result = await deleteOutletService(Number(id));
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

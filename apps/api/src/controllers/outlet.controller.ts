import { createOutletService } from '@/services/outlet/createOutlet.service';
import { deleteOutletService } from '@/services/outlet/deleteOutlet.service';
import { getOutletService } from '@/services/outlet/getOutlet.service';
import { getOutletListService } from '@/services/outlet/getOutletList.service';
import { updateOutletService } from '@/services/outlet/updateOutlet.service';
import { NextFunction, query, Request, Response } from 'express';

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
      const query = {
        id: parseInt(res.locals.user.id as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: (req.query.sortOrder as string) || 'asc',
        search: (req.query.search as string) || '',
        isDelete: Boolean(parseInt(req.query.isDelete as string)) || false,
      };
      const result = await getOutletListService(query);
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
      const result = await updateOutletService(Number(id), req.body);
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

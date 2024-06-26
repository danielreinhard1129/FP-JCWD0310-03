import { createLaundryItemService } from '@/services/laundryItem/createLaundryItem.service';
import { deleteLaundryItemService } from '@/services/laundryItem/deleteLaundryItem.service';
import { getLaundryItemService } from '@/services/laundryItem/getLaundryItem.service';
import { getLaundryItemListService } from '@/services/laundryItem/getLaundryItemList.service';
import { updateLaundryItemService } from '@/services/laundryItem/updateLaundryItem.service';
import { NextFunction, Request, Response } from 'express';

export class LaundryItemController {
  async creaeteLaundryItemController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createLaundryItemService(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getLaundryItemListController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await getLaundryItemListService();
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getLaundryItemController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;
      const result = await getLaundryItemService(Number(id));
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateLaundryItemController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;
      const result = await updateLaundryItemService(Number(id), req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async deleteLaundryController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;
      const result = await deleteLaundryItemService(Number(id));
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

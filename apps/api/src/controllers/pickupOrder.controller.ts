import { createOrderPickupOrderService } from '@/services/pickupOrder/createPickupOrder.service';
import { getPickupOrderService } from '@/services/pickupOrder/getPickupOrder.service';
import { getPickupOrdersService } from '@/services/pickupOrder/getPickupOrders.service';
import { updatePickupOrderService } from '@/services/pickupOrder/updatePickupOrder.service';
import { NextFunction, Request, Response } from 'express';

export class PickupOrderController {
  async getPickupOrdersController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = {
        // id: parseInt(req.query.id as string),
        id: parseInt(res.locals.user.id as string),
        pickupStatus: (req.query.pickupStatus as string) || 'all',
        isOrderCreated: parseInt(req.query.isOrderCreated as string),
        isClaimedbyDriver: parseInt(req.query.isClaimedbyDriver as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: parseInt(req.query.sortOrder as string) || 'asc',
      };
      const result = await getPickupOrdersService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getPickupOrderController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;
      const result = await getPickupOrderService(Number(id));
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updatePickupOrderController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await updatePickupOrderService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createPickupOrderController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createOrderPickupOrderService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

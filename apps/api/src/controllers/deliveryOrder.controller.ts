import { createDeliveryOrderService } from '@/services/deliveryOrder/createDeliveryOrder.service';
import { getDeliveryOrderService } from '@/services/deliveryOrder/getDeliveryOrder.service';
import { getDeliveryOrdersService } from '@/services/deliveryOrder/getDeliveryOrders.service';
import { updateDeliveryOrderService } from '@/services/deliveryOrder/updateDeliveryOrder.service';
import { NextFunction, Request, Response } from 'express';

export class DeliveryOrderController {
  async getDeliveryOrdersController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = {
        id: parseInt(res.locals.user.id as string),
        deliveryStatus: (req.query.deliveryStatus as string) || 'all',
        isClaimedbyDriver: parseInt(req.query.isClaimedbyDriver as string),
        latitude: parseFloat(req.query.latitude as string) || 0,
        longitude: parseFloat(req.query.longitude as string) || 0,
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: parseInt(req.query.sortOrder as string) || 'asc',
      };
      const result = await getDeliveryOrdersService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getDeliveryOrderController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;
      const result = await getDeliveryOrderService(Number(id));
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createDeliveryOrderController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createDeliveryOrderService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateDeliveryOrderController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await updateDeliveryOrderService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

import { CreateOrderService } from '@/services/order/createOrder.service';
import { getOrdersService } from '@/services/order/getOders.service';

import { NextFunction, Request, Response } from 'express';


export class OrderController {
  async CreateOrderController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CreateOrderService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getOrdersController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: parseInt(req.query.sortOrder as string) || 'desc',
      };
      const result = await getOrdersService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}


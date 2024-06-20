
import { getDeliveryOrdersService } from '@/services/deliveryOrder/getDeliveryOrders.service';
import { updateDeliveryOrderService } from '@/services/deliveryOrder/updateDeliveryOrders.service';
import { NextFunction, Request, Response } from 'express';


export class DeliveryOrderController {
  async getDeliveryOrdersController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        deliveryStatus: req.query.deliveryStatus as string || '',
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
  
  async updateDeliveryOrderController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateDeliveryOrderService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
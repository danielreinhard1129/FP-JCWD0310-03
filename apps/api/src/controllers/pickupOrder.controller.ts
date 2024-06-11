import { getPickupOrderService } from '@/services/pickupOrder/getPickupOrder.service';
import { getPickupOrdersService } from '@/services/pickupOrder/getPickupOrders.service';

import { NextFunction, Request, Response } from 'express';


export class PickupOrderController {
    async getPickupOrdersController(req: Request, res: Response, next: NextFunction) {
        try {
            const query = {
              id: parseInt(req.query.id as string),
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
    
    async getPickupOrderController(req: Request, res: Response, next: NextFunction) {
        try {
          const id = req.params.id;
          const result = await getPickupOrderService(Number(id));    
          return res.status(200).send(result);
        } catch (error) {
          next(error);
        }
      }

}
import { getOrderItemsService } from '@/services/orderItems/getOrderItems.service';
import { NextFunction, Request, Response } from 'express';


export class OrderItemController {
  async getOrderItemsController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        orderId: parseInt(req.query.orderId as string),  
      };     
      
            
      const result = await getOrderItemsService(query);
      
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  } 
}


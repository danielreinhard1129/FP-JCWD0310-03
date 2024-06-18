import { CreateOrderService } from '@/services/order/createOrder.service';
import { getOrdersService } from '@/services/order/getOrders.service';
import { getOnPendingOrdersService } from '@/services/order/getOnPendingOrders.service';


import { NextFunction, Request, Response } from 'express';
import { updateOrderStatusService } from '@/services/order/updateOrderStatus.service';


export class OrderController {
  async createOrderController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CreateOrderService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateOrderStatusController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateOrderStatusService(req.body);
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
        sortOrder: req.query.sortOrder as string || 'asc',
        filterOutlet: parseInt(req.query.filterOutlet as string) || 'all',
        filterStatus: req.query.filterStatus as string || 'all',     
      };
      
      const result = await getOrdersService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getOnPendingOrdersController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: req.query.sortOrder as string || 'asc',  
      };
      
      const result = await getOnPendingOrdersService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}


import { CreateOrderService } from '@/services/order/createOrder.service';
import { getOrderService } from '@/services/order/getOrder.service';
import { getOrdersService } from '@/services/order/getOrders.service';
import { updateOrderStatusService } from '@/services/order/updateOrderStatus.service';
import { NextFunction, query, Request, Response } from 'express';


export class OrderController {
  async createOrderController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CreateOrderService(req.body);
      return res.status(200).send(result);
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
        id: parseInt(res.locals.user.id as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: (req.query.sortOrder as string) || 'asc',
        filterOutlet: parseInt(req.query.filterOutlet as string) || 'all',
        filterStatus: (req.query.filterStatus as string) || 'all',
        filterDate: req.query.filterDate ? new Date(req.query.filterDate as string) : undefined,
        search: (req.query.search as string) || '',
        filterCategory: (req.query.filterCategory as string) || '',
      };

      const result = await getOrdersService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getOrderController(req: Request, res: Response, next: NextFunction) {
    try {
      const query={        
        id : parseInt(req.params.id as string),
        userId : parseInt(res.locals.user.id as string),
      }
      const result = await getOrderService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

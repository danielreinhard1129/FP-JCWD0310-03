import { createOrderWorkerService } from '@/services/orderWorker/createOrderWorker.service';
import { getOrderWorkersService } from '@/services/orderWorker/getOrderWorkers.service';
import { updateOrderWorkerService } from '@/services/orderWorker/updateOrderWorker.service';
import { NextFunction, Request, Response } from 'express';


export class OrderWorkerController {
  async getOrderWorkersController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(res.locals.user.id as string),
        station: req.query.station as string || 'all',
        isComplete: parseInt(req.query.isComplete as string),
        bypassRequest: parseInt(req.query.bypassRequest as string) || 'all',
        filterOutlet: parseInt(req.query.filterOutlet as string) || 'all',
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: req.query.sortOrder as string || 'asc',     
      };
      
      const result = await getOrderWorkersService(query);
      
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  } 

  async updateOrderWorkerController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateOrderWorkerService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createOrderWorkerController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createOrderWorkerService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}


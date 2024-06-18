import { getOrderWorkersService } from '@/services/orderWorker/getOrderWorkers.service';
import { NextFunction, Request, Response } from 'express';


export class OrderWorkerController {
  async getOrderWorkersController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        station: req.query.station as string,
        isComplete: parseInt(req.query.isComplete as string),
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
}


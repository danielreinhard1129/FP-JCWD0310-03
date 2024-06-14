import { getDeliverHistorysService } from '@/services/deliverOrder/getDeliverHistorys.service';
import { getDeliverProgressesService } from '@/services/deliverOrder/getDeliverProgresses.service';
import { getDeliverRequestsService } from '@/services/deliverOrder/getDeliverRequests.service';
import { updateDeliverRequestService } from '@/services/deliverOrder/updateDeliverRequest.service';
import { updateDeliverToClientService } from '@/services/deliverOrder/updateDeliverToClient.service';
import { updateDeliverToOutletService } from '@/services/deliverOrder/updateDeliverToOutlet.service';
import { NextFunction, Request, Response } from 'express';


export class DeliverOrderController {
  async getDeliverRequestsController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: parseInt(req.query.sortOrder as string) || 'asc',
      };
      const result = await getDeliverRequestsService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getDeliverProgressesController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: parseInt(req.query.sortOrder as string) || 'asc',
      };
      const result = await getDeliverProgressesService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getDeliverHistorysController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: parseInt(req.query.sortOrder as string) || 'asc',
      };
      const result = await getDeliverHistorysService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateDeliverRequestController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateDeliverRequestService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateDeliverToClientController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateDeliverToClientService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateDeliverToOutletController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateDeliverToOutletService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

}
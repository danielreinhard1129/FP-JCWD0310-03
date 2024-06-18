
import { getDeliveryHistoriesService } from '@/services/deliveryOrder/getDeliveryHistories.service';
import { getDeliveryProgressesService } from '@/services/deliveryOrder/getDeliveryProgresses.service';
import { getDeliveryRequestsService } from '@/services/deliveryOrder/getDeliveryRequests.service';
import { updateDeliveryRequestService } from '@/services/deliveryOrder/updateDeliveryRequest.service';
import { updateDeliveryToClientService } from '@/services/deliveryOrder/updateDeliveryToClient.service';
import { updateDeliveryToOutletService } from '@/services/deliveryOrder/updateDeliveryToOutlet.service';
import { NextFunction, Request, Response } from 'express';


export class DeliveryOrderController {
  async getDeliveryRequestsController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: parseInt(req.query.sortOrder as string) || 'asc',
      };
      const result = await getDeliveryRequestsService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getDeliveryProgressesController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: parseInt(req.query.sortOrder as string) || 'asc',
      };
      const result = await getDeliveryProgressesService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getDeliveryHistoriesController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: parseInt(req.query.sortOrder as string) || 'asc',
      };
      const result = await getDeliveryHistoriesService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateDeliveryRequestController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateDeliveryRequestService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateDeliveryToClientController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateDeliveryToClientService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateDeliveryToOutletController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateDeliveryToOutletService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

}
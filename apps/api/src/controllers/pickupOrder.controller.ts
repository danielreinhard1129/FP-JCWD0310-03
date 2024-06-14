
import { getPickupHistorysService } from '@/services/pickupOrder/getPickupHistorys.service';
import { getPickupOrderService } from '@/services/pickupOrder/getPickupOrder.service';
import { getPickupOrdersService } from '@/services/pickupOrder/getPickupOrders.service';
import { getPickupProgressesService } from '@/services/pickupOrder/getPickupProgresses.service';
import { getPickupRequestsService } from '@/services/pickupOrder/getPickupRequests.service';
import { updatePickupRequestService } from '@/services/pickupOrder/updatePickupRequest.service';
import { updatePickupToClientService } from '@/services/pickupOrder/updatePickupToClient.service';
import { updatePickupToOutletService } from '@/services/pickupOrder/updatePickupToOutlet.service';


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

  async getPickupRequestsController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: parseInt(req.query.sortOrder as string) || 'asc',
      };
      const result = await getPickupRequestsService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getPickupProgressesController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: parseInt(req.query.sortOrder as string) || 'asc',
      };
      const result = await getPickupProgressesService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getPickupHistorysController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: parseInt(req.query.sortOrder as string) || 'asc',
      };
      const result = await getPickupHistorysService(query);
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

  async updatePickupRequestController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updatePickupRequestService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updatePickupToClientController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updatePickupToClientService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updatePickupToOutletController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updatePickupToOutletService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

}

import { getLaundryItemListService } from '@/services/laundryItem/getLaundryItemList.service';
import { NextFunction, Request, Response } from 'express';


export class LaundryItemController {
    async getLaundryItemListController(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await getLaundryItemListService();
            return res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }

}

import { getOutletListService } from '@/services/outlet/getOutletList.service';
import { NextFunction, Request, Response } from 'express';


export class OutletController {
    async getOutletListController(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await getOutletListService();
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }

}
import { deleteUserAddressService } from '@/services/address/delete-user-address.service';
import { getAddressByIdService } from '@/services/address/get-address-byId.service';
import { getUserAddressService } from '@/services/address/get-user-address.service';
import { updateUserAddressService } from '@/services/address/update-user-address.service';
import { NextFunction, Request, Response } from 'express';

export class AddressController {
  async getUserAddressController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;

      const result = await getUserAddressService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getAddressById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      const result = await getAddressByIdService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateUserAddressController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;

      const result = await updateUserAddressService(Number(id), req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteUserAddressController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;

      const result = await deleteUserAddressService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

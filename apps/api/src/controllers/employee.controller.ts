
import { addEmployeeService } from '@/services/employee/addEmployee';
import { NextFunction, Request, Response } from 'express';


export class EmployeeController {
  async addEmployeeController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await addEmployeeService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  } 
}
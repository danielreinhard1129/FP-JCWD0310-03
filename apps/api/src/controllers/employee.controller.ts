
import { addEmployeeService } from '@/services/employee/addEmployee.service';
import { deleteEmployeeService } from '@/services/employee/deleteEmployee.service';
import { getEmployeeService } from '@/services/employee/getEmployee.service';
import { getEmployeesService } from '@/services/employee/getEmployees.service';
import { updateEmployeeService } from '@/services/employee/updateEmployee.service';
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

  async getEmployeesController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        // id: parseInt(req.query.id as string),
        id: parseInt(res.locals.user.id as string),
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'id',
        sortOrder: parseInt(req.query.sortOrder as string) || 'desc',
      };      
      const result = await getEmployeesService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getEmployeeController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await getEmployeeService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateEmployeeController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateEmployeeService(
        Number(req.params.id),
        req.body,        
      );
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async deleteEmployeeController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await deleteEmployeeService(
        Number(req.params.id)      
      );
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
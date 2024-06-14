
//import { verifyToken } from '@/lib/jwt';
import { EmployeeController } from '@/controllers/employee.controller';
import { Router } from 'express';

export class EmployeeRouter {
  private router: Router;
  private employeeController: EmployeeController;

  constructor() {
    this.employeeController = new EmployeeController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.employeeController.addEmployeeController);
    this.router.get('/', this.employeeController.getEmployeesController);
    this.router.get('/:id', this.employeeController.getEmployeeController);
    this.router.patch('/:id', this.employeeController.updateEmployeeController);
  }

  getRouter(): Router {
    return this.router;
  }
}
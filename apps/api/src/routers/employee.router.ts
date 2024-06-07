
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
    this.router.post('/add-employee', this.employeeController.addEmployeeController);
  }

  getRouter(): Router {
    return this.router;
  }
}
import { EmployeeController } from '@/controllers/employee.controller';
import { addEmployeeValidator } from '@/middlewares/addEmployeeValidator';
import { updateEmployeeValidator } from '@/middlewares/updateEmployeeValidator';
import { verifyToken } from '@/middlewares/verifyToken';
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
    this.router.post(
      '/',
      verifyToken,
      addEmployeeValidator,
      this.employeeController.addEmployeeController,
    );
    this.router.get(
      '/',
      verifyToken,
      this.employeeController.getEmployeesController,
    );
    this.router.get(
      '/:id',
      verifyToken,
      this.employeeController.getEmployeeController,
    );
    this.router.patch(
      '/:id',
      verifyToken,
      updateEmployeeValidator,
      this.employeeController.updateEmployeeController,
    );
    this.router.delete(
      '/:id',
      verifyToken,
      this.employeeController.deleteEmployeeController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

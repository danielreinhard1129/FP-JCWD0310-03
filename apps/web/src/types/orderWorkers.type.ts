import { Employee, EmployeeStation } from "./employee.type";
import { Order } from "./order.type";

export interface OrderWorker {
    id: number;
    orderId: number;
    workerId: number;
    station?: EmployeeStation; 
    isComplete: boolean;
    order: Order
    worker: Employee
  }
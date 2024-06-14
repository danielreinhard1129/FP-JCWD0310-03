import { Employee } from "./employee.type";
import { Order } from "./order.type";
import { User } from "./user.type";

export enum DeliverStatus {
    Waiting_for_Driver = "Waiting_for_Driver",
    On_The_Way_to_Outlet = "On_The_Way_to_Outlet",
    On_The_Way_to_Client = "On_The_Way_to_Client",
    Received_by_Client = "Received_by_Client"
  }
  
  
  export interface DeliverOrder {
    id: number;
    deliverNumber: string;
    deliverStatus: DeliverStatus;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    driverId?: number | null;
    orderId: number;
    user: User;
    driver?: Employee | null;
    order: Order;
  }
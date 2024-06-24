import { OrderItem } from "./orderItem.type";
import { Payment } from "./payment.type";
import { PickupOrder } from "./pickupOrder.type";

export enum OrderStatus {
  Waiting_for_Driver_Pickup = 'Waiting_for_Driver_Pickup',
  Laundry_On_The_Way_To_Outlet = 'Laundry_On_The_Way_To_Outlet',
  Laundry_Has_Arrived_At_Outlet = 'Laundry_Has_Arrived_At_Outlet',
  Laundry_Being_Washed = 'Laundry_Being_Washed',
  Laundry_Finished_Washing = 'Laundry_Finished_Washing',
  Laundry_Being_Ironed = 'Laundry_Being_Ironed',
  Laundry_Finished_Ironing = 'Laundry_Finished_Ironing',
  Laundry_Being_Packed = 'Laundry_Being_Packed',
  Laundry_Finished_Packing = 'Laundry_Finished_Packing',
  Awaiting_Payment = 'Awaiting_Payment',
  Laundry_Being_Delivered_To_Customer = 'Laundry_Being_Delivered_To_Customer',
  Laundry_Received_By_Customer = 'Laundry_Received_By_Customer'
}

export interface Order {
  id: number;
  orderNumber: string;
  orderStatus: OrderStatus;
  weight: number;
  laundryPrice: number;
  createdAt: Date;
  updatedAt: Date;
  pickupOrderId: number;
  pickupOrder: PickupOrder;
  orderItem: OrderItem[];
  payment: Payment[];
}
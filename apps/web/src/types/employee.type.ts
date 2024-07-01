import { DeliveryOrder } from "./deliveryOrder.type";
import { OrderWorker } from "./orderWorker.type";
import { Outlet } from "./outlet.type";
import { PickupOrder } from "./pickupOrder.type";
import { User } from "./user.type";

export enum EmployeeStation {
  WASHING = 'WASHING',
  IRONING = 'IRONING',
  PACKING = 'PACKING',
}

export enum EmployeeWorkShift {
  DAY = 'DAY',
  NIGHT = 'NIGHT',
}

export interface Employee {
  id: number;
  workShift: EmployeeWorkShift;
  isSuperAdmin: boolean;
  station: EmployeeStation;
  userId: number;
  outletId: number;
  outlet: Outlet;
  user: User;
  pickupOrder: PickupOrder[];
  deliveryOrder: DeliveryOrder[];
  orderWorker: OrderWorker[];
}


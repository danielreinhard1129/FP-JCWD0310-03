import { Outlet } from "./outlet.type";
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
    station?: EmployeeStation;
    userId: number;
    outletId?: number;
    outlet?: Outlet;
    user: User;
  }


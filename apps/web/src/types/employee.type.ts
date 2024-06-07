import { Outlet } from './outlet.type';
import { User } from './user.type';

export interface Employee {
  id: number;
  workShift: Date;
  isSuperAdmin: boolean;
  station?: EmployeeStation;
  userId: number;
  outletId: number;

  user: User;
  outlet: Outlet;
}

export enum EmployeeStation {
  WASHING = 'WASHING',
  IRONING = 'IRONING',
  PACKING = 'PACKING',
}

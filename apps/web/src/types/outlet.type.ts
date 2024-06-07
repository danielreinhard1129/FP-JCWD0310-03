import { Address } from './address.type';
import { Employee } from './employee.type';

export interface Outlet {
  id: number;
  outletName: string;
  outletType: OutletType;
  createdAt: Date;
  updatedAt: Date;
  isDelete: boolean;

  employee: Employee;
  Address: Address;
}

export enum OutletType {
  MAIN = 'MAIN',
  BRANCH = 'BRANCH',
}

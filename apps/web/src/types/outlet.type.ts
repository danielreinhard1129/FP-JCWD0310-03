import { Address } from './address.type';
import { Employee } from './employee.type';
import { PickupOrder } from './pickupOrder.type';

export enum OutletType {
  MAIN = 'MAIN',
  BRANCH = 'BRANCH',
}

export interface Outlet {
  id: number;
  outletName: string;
  outletType: OutletType;
  createdAt: Date;
  deletedAt?: Date | null;
  updatedAt: Date;
  isDelete: boolean;
  employee: Employee[];
  address: Address[];
  pickupOrder: PickupOrder[];
}

export interface IFormOutlet {
  outletName: string;
  outletType: OutletType;
  address: {
    addressLine: string;
    city: string;
  };
}

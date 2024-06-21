import { Address } from './address.type';
import { Employee } from './employee.type';

export enum OutletType {
  MAIN = 'MAIN',
  BRANCH = 'BRANCH',
}

export interface Outlet {
  id: number;
  outletName: string;
  outletType: OutletType;
  outletImage: string;
  createdAt: Date;
  updatedAt: Date;
  isDelete: boolean;
  Employee?: Employee;
  address: Address[];
}

export interface IFormOutlet {
  outletName: string;
  outletType: OutletType;
  outletImage: File[];
  address: {
    addressLine: string;
    city: string;
  };
}

import { Address } from "./address.type";
import { Employee } from "./employee.type";

export enum OutletType {
  MAIN = 'MAIN',
  BRANCH = 'BRANCH',
}

export interface Outlet {
    id: number;
    outletName: string;
    outletType: OutletType;
    createdAt: Date;
    updatedAt: Date;
    isDelete: boolean;
    Employee?: Employee;
    Address?: Address;
  }
import exp from 'constants';
import { Employee } from './employee.type';
import { Address } from './address.type';

export interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  isVerify?: boolean;
  role: Role;
  profilePic?: string;
  createdAt: Date;
  isDelete: boolean;
  
  employee: Employee;
  address: Address;
}
export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  OUTLET_ADMIN = 'OUTLET_ADMIN',
  WORKER = 'WORKER',
  DRIVER = 'DRIVER',
  CUSTOMER = 'CUSTOMER',
}

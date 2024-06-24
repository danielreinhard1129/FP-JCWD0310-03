import { Address } from './address.type';
import { Employee } from './employee.type';

export interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  isVerify?: boolean;
  role: string;
  profilePic?: string;
  createdAt: Date;
  isDelete: boolean;
  Employee?: Employee;
  address?: Address[];
  tokenExpiresIn?: Date;
}

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  OUTLET_ADMIN = 'OUTLET_ADMIN',
  WORKER = 'WORKER',
  DRIVER = 'DRIVER',
  CUSTOMER = 'CUSTOMER',
}

export interface IFormUser {
  fullName: string;
  email: string;
  password: string;
  profilePic?: File[];
  newPassword?: string | null;
  addressLine: string;
  city: string;
  isPrimary: boolean;
  latitude?: string;
  longitude?: string;
}

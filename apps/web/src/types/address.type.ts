import { Outlet } from './outlet.type';
import { User } from './user.type';

export interface Address {
  id: number;
  addressLine: string;
  city: string;
  isPrimary: boolean;
  latitude?: string;
  longitude?: string;
  isDelete: boolean;
  outletId: number;
  userId?: number;
  outlet?: Outlet;
  user?: User[];
}

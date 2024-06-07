import { Outlet, User } from "@prisma/client";

export interface Address {
    id: number;
    address: string;
    city: string;
    isPrimary: boolean;
    latitude: string;
    longitude: string;
    isDelete: boolean;
    outletId: number;
    userId: number;
    outlet: Outlet;
    user: User;
  }
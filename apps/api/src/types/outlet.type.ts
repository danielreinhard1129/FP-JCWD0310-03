import { Address, Employee } from "@prisma/client";
import { OutletType } from "./outletType.type";

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
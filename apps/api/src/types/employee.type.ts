import { Outlet, User } from "@prisma/client";
import { EmployeeStation } from "./employeeStation.type";

export interface Employee {
    id: number;
    workShift: Date;
    isSuperAdmin: boolean;
    station?: EmployeeStation;
    userId: number;
    outletId: number;
    outlet: Outlet;
    user: User;
  }
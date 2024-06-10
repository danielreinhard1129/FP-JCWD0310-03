import { Address, Employee } from "@prisma/client";

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
    Address?: Address;
  }
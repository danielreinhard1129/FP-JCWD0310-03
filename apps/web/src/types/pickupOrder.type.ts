import { Order } from "./order.type";
import { Outlet } from "./outlet.type";
import { User } from "./user.type";

export enum PickupStatus {
    Waiting_for_Driver = "Waiting_for_Driver",
    On_The_Way_to_Client = "On_The_Way_to_Client",
    On_The_Way_to_Outlet = "On_The_Way_to_Outlet",
    Received_by_Outlet = "Received_by_Outlet"
  }
  
export interface PickupOrder {
    id: number;
    pickupNumber: string;
    pickupStatus: PickupStatus;
    distance: number;
    pickupPrice: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    outletId: number;
    isOrderCreated: boolean;
    user: User;
    outlet: Outlet;
    order: Order[];
  }
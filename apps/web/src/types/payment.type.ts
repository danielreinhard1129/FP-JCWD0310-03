import { Order } from "./order.type";

export enum PaymentStatus {
    Pending = "Pending",
    Completed = "Completed",
    Failed = "Failed",
    Expired = "Expired"
}

export interface Payment {
    id: number;
    invoiceNumber: string;
    amount: number;
    paymentStatus: PaymentStatus;
    snapToken?: string | null;
    snapRedirectUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
    orderId: number;
    order: Order;
}
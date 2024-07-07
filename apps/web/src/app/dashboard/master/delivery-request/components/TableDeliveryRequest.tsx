'use client';
import { TableCell, TableRow } from '@/components/ui/table';
import useCreateDeliveryOrder from '@/hooks/api/deliveryOrder/useCreateDeliveryOrder';
import { EmployeeWorkShift } from '@/types/employee.type';
import { FC, useEffect, useState } from 'react';
import { DeliveryRequest } from './DeliveryRequest';

interface DeliveryRequestRowTableProps {
  key: number;
  orderId: number;
  orderNumber: string;
  pickupNumber: string;
  weight: string;
  price: string;
  createdAt: string;
  status: string;
  refetch: () => void;
}

const TableDeliveryRequest: FC<DeliveryRequestRowTableProps> = ({
  key,
  orderId,
  orderNumber,
  pickupNumber,
  weight,
  price,
  createdAt,
  status,
  refetch,
}) => {
  return (
    <TableRow key={key} className="text-sm">
      <TableCell>{orderNumber}</TableCell>
      <TableCell>{pickupNumber}</TableCell>
      <TableCell>{weight}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{createdAt}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>
        <DeliveryRequest id={orderId} refetch={refetch} />
      </TableCell>
    </TableRow>
  );
};
export default TableDeliveryRequest;

'use client';
import { TableCell, TableRow } from '@/components/ui/table';
import { FC } from 'react';

interface OrderRowTableProps {
  key: number;
  orderId: number;
  orderNumber: string;
  pickupNumber: string;
  weight: string;
  price: string;
  createdAt: string;
  status: string;
}

const TableOrder: FC<OrderRowTableProps> = ({
  key,
  orderId,
  orderNumber,
  pickupNumber,
  weight,
  price,
  createdAt,
  status,
}) => {
  return (
    <TableRow key={key} className="text-sm">
      <TableCell>{orderNumber}</TableCell>
      <TableCell>{pickupNumber}</TableCell>
      <TableCell>{weight}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{createdAt}</TableCell>
      <TableCell>{status}</TableCell>
    </TableRow>
  );
};
export default TableOrder;

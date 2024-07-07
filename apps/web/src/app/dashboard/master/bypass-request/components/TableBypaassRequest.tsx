'use client';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import useUpdateOrderWorker from '@/hooks/api/orderWorker/useUpdateOrderWorker';
import { EmployeeWorkShift } from '@/types/employee.type';
import { FC, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AcceptBypass } from './AcceptBypass';
import { RejectBypass } from './RejectBypass';

interface BypassRequestRowTableProps {
  key: number;
  orderWorkerId: number;
  orderNumber: string;
  weight: string;
  price: string;
  outlet: string;
  note: string;
  station: string;
  refetch: () => void;
  isAccept: boolean;
  isReject: boolean;
}

const TableBypassRequest: FC<BypassRequestRowTableProps> = ({
  key,
  orderWorkerId,
  orderNumber,
  weight,
  price,
  outlet,
  note,
  station,
  refetch,
  isAccept,
  isReject,
}) => {
  return (
    <TableRow key={key} className="text-sm">
      <TableCell>{orderNumber}</TableCell>
      <TableCell>{weight}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{outlet}</TableCell>
      <TableCell>{station}</TableCell>
      <TableCell>{note}</TableCell>
      <TableCell>
        {isAccept == true ? (
          <div className='flex w-40'>
            <p className='py-1 rounded-lg w-full text-center font-bold text-green-500'>Accepted</p>
          </div>
        ) : isReject == true ? (
          <div>
            <div className='flex w-40'>
            <p className='py-1 rounded-lg w-full text-center font-bold text-red-500'>Rejected</p>
          </div>
          </div>
        ) : (
          <div className="flex gap-2 w-40 justify-end">
            
            <RejectBypass id={orderWorkerId} refetch={refetch} />
            <AcceptBypass id={orderWorkerId} refetch={refetch} />
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};
export default TableBypassRequest;

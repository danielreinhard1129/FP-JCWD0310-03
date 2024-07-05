'use client';
import { TableCell, TableRow } from '@/components/ui/table';
import useDeleteEmployee from '@/hooks/api/employee/useDeleteEmployee';
import { SquarePen, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

interface EmployeeRowTableProps {
  key: number;
  employeeId: number;
  name?: string;
  email?: string;
  role?: string;
  outlet: string | undefined;
  workShift: string;
  station: string | undefined;
  refetch: () => void;
}

const TableEmployees: FC<EmployeeRowTableProps> = ({
  key,
  employeeId,
  name,
  email,
  role,
  outlet,
  workShift,
  station,
  refetch,
}) => {
  const { isLoading, deleteEmployee } = useDeleteEmployee(Number(employeeId));

  const handleClick = async () => {
    try {
      await deleteEmployee();
      refetch();
    } catch (error) {
      console.error('Failed to update pickup order', error);
    }
  };

  return (
    <TableRow key={key} className="bg-white text-sm">
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{role != 'WORKER' ? role : `${role} - ${station}`}</TableCell>
      <TableCell>{outlet}</TableCell>
      <TableCell>{workShift}</TableCell>
      <TableCell>
        <div className="flex gap-8 px-0">
          <Link
            className="px-0"
            href={`/dashboard/master/employee/${employeeId}`}
          >
            <SquarePen />
          </Link>

          <Trash2
            className="cursor-pointer text-red-500"
            onClick={handleClick}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};
export default TableEmployees;

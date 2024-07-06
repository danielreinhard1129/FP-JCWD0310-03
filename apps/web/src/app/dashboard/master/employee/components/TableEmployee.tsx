'use client';
import { TableCell, TableRow } from '@/components/ui/table';
import { SquarePen } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { DeleteEmployee } from './DeleteEmployee';

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
  return (
    <>
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
            <DeleteEmployee id={employeeId} refetch={refetch} />
          </div>
        </TableCell>
      </TableRow>
    </>
  );

};
export default TableEmployees;

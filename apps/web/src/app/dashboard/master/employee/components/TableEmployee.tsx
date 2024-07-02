'use client';
import { TableCell, TableRow } from '@/components/ui/table';
import { SquarePen } from 'lucide-react';
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
  status: string;
  station: string | undefined;
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
  status,
}) => {
  const [currentStatus, setCurrentStatus] = useState('');

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const currentHour = now.getHours();

      if (workShift === 'DAY') {
        if (currentHour >= 6 && currentHour < 18) {
          setCurrentStatus('Active');
        } else {
          setCurrentStatus('Inactive');
        }
      } else if (workShift === 'NIGHT') {
        if (currentHour >= 18 || currentHour < 6) {
          setCurrentStatus('Active');
        } else {
          setCurrentStatus('Inactive');
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);

    return () => clearInterval(interval);
  }, [workShift]);

  return (
    <TableRow key={key} className="border-4 border-white">
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{role != 'WORKER' ? role : `${role} - ${station}`}</TableCell>
      <TableCell>{outlet}</TableCell>
      <TableCell>{workShift}</TableCell>
      <TableCell>{currentStatus}</TableCell>
      <TableCell>
        <Link href={`/dashboard/master/employee/${employeeId}`}>
          <SquarePen />
        </Link>
      </TableCell>
    </TableRow>
  );
};
export default TableEmployees;

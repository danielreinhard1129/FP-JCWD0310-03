'use client';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { EmployeeWorkShift } from '@/types/employee.type';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface PickupOrderRowTableProps {
  key: number;
  pickupOrderId: number;
  pickupNumber: string;
  name?: string;
  email?: string;
  outlet: string;
  status: string;
  createdAt: string;
  employeeWorkShift?: EmployeeWorkShift;
}

const TablePickupOrder: FC<PickupOrderRowTableProps> = ({
  key,
  pickupOrderId,
  pickupNumber,
  name,
  email,
  outlet,
  status,
  createdAt,
  employeeWorkShift,
}) => {
  const router = useRouter();
  //shift confirmation
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const currentHour = now.getUTCHours() + 7;
      if (employeeWorkShift === EmployeeWorkShift.DAY) {
        if (currentHour >= 6 && currentHour < 18) {
          setIsDisable(false);
        } else {
          setIsDisable(true);
        }
      } else if (employeeWorkShift === EmployeeWorkShift.NIGHT) {
        if (currentHour >= 18 || currentHour < 6) {
          setIsDisable(false);
        } else {
          setIsDisable(true);
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);

    return () => clearInterval(interval);
  }, [employeeWorkShift]);

  return (
    <TableRow key={key}>
      <TableCell>{pickupNumber}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{outlet}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{createdAt}</TableCell>
      <TableCell>
        <Button
          disabled={isDisable}
          className="font-bold bg-mythemes-maingreen text-center text-white rounded-md"
          onClick={() =>
            router.push(
              `/dashboard/master/order/pickup-order-list/${pickupOrderId}`,
            )
          }
        >
          Create Order
        </Button>
      </TableCell>
    </TableRow>
  );
};
export default TablePickupOrder;

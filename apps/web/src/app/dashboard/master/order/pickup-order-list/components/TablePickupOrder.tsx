'use client'
import { TableCell, TableRow } from '@/components/ui/table';
import { EmployeeWorkShift } from '@/types/employee.type';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface PickupOrderRowTableProps {
    key: number;
    pickupOrderId: number;
    pickupNumber: string
    name: string
    email: string
    outlet: string
    status: string
    createdAt: string
    employeeWorkShift?: EmployeeWorkShift
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
    employeeWorkShift
}) => {
    const router = useRouter();
    //shift confirmation
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const currentHour = now.getHours();

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
        <TableRow key={key} >
            <TableCell>{pickupNumber}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{outlet}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{createdAt}</TableCell>
            <TableCell>
                <button 
                disabled={isDisable}
                className='font-bold bg-mythemes-maingreen text-center text-white rounded-md' 
                onClick={() => router.push(`/dashboard/master/order/pickup-order-list/${pickupOrderId}`)}
                >Create Order</button>
                {/* <Link  href={`/dashboard/master/order/pickup-order-list/${pickupOrderId}`}>
                    <div className='font-bold bg-mythemes-maingreen text-center text-white rounded-md'>
                        <h1 >Create Order</h1>
                    </div>
                </Link> */}
            </TableCell>
        </TableRow>
    )
}
export default TablePickupOrder
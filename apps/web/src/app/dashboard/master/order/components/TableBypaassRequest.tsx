'use client';
import { TableCell, TableRow } from '@/components/ui/table';
import useUpdateOrderWorker from '@/hooks/api/orderWorker/useUpdateOrderWorker';
import { EmployeeWorkShift } from '@/types/employee.type';
import { FC, useEffect, useState } from 'react';

interface BypassRequestRowTableProps {
  key: number;
  orderWorkerId: number;
  orderNumber: string;
  weight: string;
  price: string;
  outlet: string;
  station: string;
  refetch: () => void;
  isAccept: boolean;
  isReject: boolean;
  employeeWorkShift?: EmployeeWorkShift;
}

const TableBypassRequest: FC<BypassRequestRowTableProps> = ({
  key,
  orderWorkerId,
  orderNumber,
  weight,
  price,
  outlet,
  station,
  refetch,
  isAccept,
  isReject,
  employeeWorkShift,
}) => {
  const { updateOrderWorker } = useUpdateOrderWorker();
  const acceptValues = {
    orderWorkerId,
    action: 'accept',
  };
  const rejectValues = {
    orderWorkerId,
    action: 'reject',
  };

  const handleAccept = async () => {
    try {
      await updateOrderWorker(acceptValues);
      refetch();
    } catch (error) {
      console.error('Failed to update pickup order', error);
    }
  };
  const handleReject = async () => {
    try {
      await updateOrderWorker(rejectValues);
      refetch();
    } catch (error) {
      console.error('Failed to update pickup order', error);
    }
  };

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
    <TableRow key={key} className="text-sm">
      <TableCell>{orderNumber}</TableCell>
      <TableCell>{weight}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{outlet}</TableCell>
      <TableCell>{station}</TableCell>
      <TableCell>
        {isAccept == true ? (
          <div>
            <button
              disabled
              className="py-1 rounded-lg bg-green-500 w-1/2 text-white font-bold"
            >
              Accepted
            </button>
          </div>
        ) : isReject == true ? (
          <div>
            <button
              disabled
              className="py-1 bg-red-500 w-1/2 text-white font-bold"
            >
              Rejected
            </button>
          </div>
        ) : (
          <div className="flex gap-2 w-40 justify-end">
            <button
              disabled={isDisable}
              onClick={handleReject}
              className="py-1 rounded-lg bg-white w-1/2 text-red-500 font-bold hover:text-white hover:bg-red-500"
            >
              Reject
            </button>
            <button
              disabled={isDisable}
              onClick={handleAccept}
              className="py-1 rounded-lg w-1/2 text-mythemes-maingreen font-bold hover:text-white hover:bg-mythemes-maingreen"
            >
              Accept
            </button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};
export default TableBypassRequest;

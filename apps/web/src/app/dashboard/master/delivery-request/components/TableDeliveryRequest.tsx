'use client'
import { TableCell, TableRow } from '@/components/ui/table';
import useCreateDeliveryOrder from '@/hooks/api/deliveryOrder/useCreateDeliveryOrder';
import { EmployeeWorkShift } from '@/types/employee.type';
import { FC, useEffect, useState } from 'react';

interface DeliveryRequestRowTableProps {
    key: number;
    orderId: number;
    orderNumber: string
    pickupNumber: string
    weight: string
    price: string
    createdAt: string
    status: string
    refetch: () => void
    employeeWorkShift?: EmployeeWorkShift
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
    employeeWorkShift
}) => {
    const { createDeliveryOrder } = useCreateDeliveryOrder()

    const values = {
        orderId: orderId
    }

    const handleCreate = async () => {
        try {
            await createDeliveryOrder(values);
            refetch();
        } catch (error) {
            console.error('Failed to create delivery order', error);
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
        <TableRow key={key} >
            <TableCell>{orderNumber}</TableCell>
            <TableCell>{pickupNumber}</TableCell>
            <TableCell>{weight}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>{createdAt}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>
                <div className='flex gap-2 w-40 justify-end'>
                    <button
                        disabled={isDisable}
                        onClick={handleCreate}
                        className='py-0.5 bg-mythemes-maingreen w-1/2 text-white font-bold'
                    >Create Delivery Order</button>
                </div>
            </TableCell>
        </TableRow>
    )
}
export default TableDeliveryRequest
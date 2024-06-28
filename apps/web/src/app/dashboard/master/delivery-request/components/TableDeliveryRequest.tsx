'use client'
import { TableCell, TableRow } from '@/components/ui/table';
import useCreateDeliveryOrder from '@/hooks/api/deliveryOrder/useCreateDeliveryOrder';
import { FC } from 'react';

interface DeliveryRequestRowTableProps {
    key: number;
    orderId: number;
    orderNumber: string
    pickupNumber: string
    weight: string
    price: string
    createdAt: string
    status: string
    refetch: ()=>void
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
    refetch
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
                    <button onClick={handleCreate} className='py-0.5 bg-mythemes-maingreen w-1/2 text-white font-bold'>Create Delivery Order</button>
                </div>
            </TableCell>
        </TableRow>
    )
}
export default TableDeliveryRequest
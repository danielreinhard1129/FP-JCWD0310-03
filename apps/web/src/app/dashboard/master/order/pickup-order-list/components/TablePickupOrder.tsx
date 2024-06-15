'use client'
import { TableCell, TableRow } from '@/components/ui/table';
import useUpdatePickupOrder from '@/hooks/api/pickupOrder/useUpdatePickupRequest';
import Link from 'next/link';
import { FC } from 'react';

interface PickupOrderRowTableProps {
    key: number;
    pickupOrderId: number;
    pickupNumber: string
    name: string
    email: string
    outlet: string
    status: string
    createdAt: string
}

const TablePickupOrder: FC<PickupOrderRowTableProps> = ({
    key,
    pickupOrderId,
    pickupNumber,
    name,
    email,
    outlet,
    status,
    createdAt
}) => {

    

    return (
        <TableRow key={key} >
            <TableCell>{pickupNumber}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{outlet}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{createdAt}</TableCell>
            <TableCell>
                <Link href={`/dashboard/master/order/pickup-order-list/${pickupOrderId}`}>
                    <div className='font-bold bg-mythemes-maingreen text-center text-white rounded-md'>
                        <h1 >Create Order</h1>
                    </div>
                </Link>
            </TableCell>
        </TableRow>
    )
}
export default TablePickupOrder
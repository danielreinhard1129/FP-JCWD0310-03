'use client'
import { TableCell, TableRow } from '@/components/ui/table';
import useUpdateDeliverToClient from '@/hooks/api/deliverOrder/useUpdateDeliverToClient';
import useUpdateDeliverToOutlet from '@/hooks/api/deliverOrder/useUpdateDeliverToOutlet';
import { MapPinned } from 'lucide-react';
import { FC } from 'react';

interface DeliverOrderRowTableProps {
    key: number;
    driverId: number;
    deliverOrderId: number;
    deliverNumber: string
    name: string
    address: string
    status: string
    refetch: () => void
}

const TableDeliverProgress: FC<DeliverOrderRowTableProps> = ({
    key,
    driverId,
    deliverOrderId,
    deliverNumber,
    name,
    status,
    address,
    refetch,
}) => {
    const values = {
        deliverOrderId: Number(deliverOrderId),
        driverId: Number(driverId)
    }

    const { updateDeliverToOutlet } = useUpdateDeliverToOutlet()
    const { updateDeliverToClient } = useUpdateDeliverToClient()

    const handleUpdateDeliverToOutlet = async () => {
        try {
            await updateDeliverToOutlet(values);
            refetch();
        } catch (error) {
            console.error('Failed to update deliver order', error);
        }
    };
    const handleUpdateDeliverToClient = async () => {
        try {
            await updateDeliverToClient(values);
            refetch();
        } catch (error) {
            console.error('Failed to update deliver order', error);
        }
    };

    return (
        <TableRow key={key} >
            <TableCell>{deliverNumber}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>
                <MapPinned />
            </TableCell>
            <TableCell>
                {status == "On_The_Way_to_Outlet" ? (
                    <div onClick={handleUpdateDeliverToOutlet} className='font-bold cursor-pointer bg-mythemes-maingreen text-center text-white rounded-md'>
                        <h1 >Picked from Outlet</h1>
                    </div>
                ) : (
                    <div onClick={handleUpdateDeliverToClient} className='font-bold cursor-pointer bg-mythemes-maingreen text-center text-white rounded-md'>
                        <h1 >Delivered to Client</h1>
                    </div>
                )}
            </TableCell>
        </TableRow>
    )
}
export default TableDeliverProgress
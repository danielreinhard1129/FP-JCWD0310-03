'use client'
import { TableCell, TableRow } from '@/components/ui/table';
import useUpdatePickupToClient from '@/hooks/api/pickupOrder/useUpdatePickupToClient';
import useUpdatePickupToOutlet from '@/hooks/api/pickupOrder/useUpdatePickupToOutlet';
import { MapPinned } from 'lucide-react';
import { FC } from 'react';

interface PickupOrderRowTableProps {
    key: number;
    driverId: number;
    pickupOrderId: number;
    pickupNumber: string
    name: string
    address: string
    outlet: string
    status: string
    refetch: () => void
}

const TablePickupProgress: FC<PickupOrderRowTableProps> = ({
    key,
    driverId,
    pickupOrderId,
    pickupNumber,
    name,
    address,
    outlet,
    status,
    refetch,
}) => {
    const values = {
        pickupOrderId: Number(pickupOrderId),
        driverId: Number(driverId)
    }

    const { updatePickupToClient } = useUpdatePickupToClient()
    const { updatePickupToOutlet } = useUpdatePickupToOutlet()

    const handleUpdatePickupToClient = async () => {
        try {
            await updatePickupToClient(values);
            refetch();
        } catch (error) {
            console.error('Failed to update pickup order', error);
        }
    };

    const handleUpdatePickupToOutlet = async () => {
        try {
            await updatePickupToOutlet(values);
            refetch(); 
        } catch (error) {
            console.error('Failed to update pickup order', error);
        }
    };

    return (
        <TableRow key={key} >
            <TableCell>{pickupNumber}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{outlet}</TableCell>
            <TableCell>
                <MapPinned />
            </TableCell>
            <TableCell>
                {status=="On_The_Way_to_Client" ? (
                <div onClick={handleUpdatePickupToClient} className='font-bold cursor-pointer bg-mythemes-maingreen text-center text-white rounded-md'>
                    <h1 >Picked from Client</h1>
                </div>
                ):(
                <div onClick={handleUpdatePickupToOutlet} className='font-bold cursor-pointer bg-mythemes-maingreen text-center text-white rounded-md'>
                    <h1 >Delivered to Outlet</h1>
                </div>
                )}
            </TableCell>
        </TableRow>
    )
}
export default TablePickupProgress
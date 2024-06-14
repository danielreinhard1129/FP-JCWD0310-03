'use client'
import { TableCell, TableRow } from '@/components/ui/table';
import useUpdatePickupRequest from '@/hooks/api/pickupOrder/useUpdatePickupRequest';
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
    refetch1: ()=> void
    refetch2: ()=> void
}

const TablePickupRequest: FC<PickupOrderRowTableProps> = ({
    key,
    driverId,
    pickupOrderId,
    pickupNumber,
    name,
    address,
    outlet,
    refetch1,
    refetch2
}) => {
    const values = { 
        pickupOrderId: Number(pickupOrderId), 
        driverId: Number(driverId)
    }

    const { updatePickupRequest } = useUpdatePickupRequest()

    const handleUpdatePickupOrder = async () => {
        try {
            await updatePickupRequest(values);
            refetch1(); 
            refetch2();
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
                        <div onClick={handleUpdatePickupOrder} className='font-bold cursor-pointer bg-mythemes-maingreen text-center text-white rounded-md'>
                        <h1 >Pick</h1>
                    </div>
            </TableCell>
        </TableRow>
    )
}
export default TablePickupRequest
'use client'
import { TableCell, TableRow } from '@/components/ui/table';
import useUpdateDeliverRequest from '@/hooks/api/deliverOrder/useUpdateDeliverRequest';
import { MapPinned } from 'lucide-react';
import { FC } from 'react';

interface DeliverOrderRowTableProps {
    key: number;
    driverId: number;
    deliverOrderId: number;
    deliverNumber: string
    name: string
    address: string
    refetch1: ()=> void
    refetch2: ()=> void
}

const TableDeliverRequest: FC<DeliverOrderRowTableProps> = ({
    key,
    driverId,
    deliverOrderId,
    deliverNumber,
    name,
    address,
    refetch1,
    refetch2
}) => {
    const values = { 
        deliverOrderId: Number(deliverOrderId), 
        driverId: Number(driverId)
    }

    const { updateDeliverRequest } = useUpdateDeliverRequest()

    const handleUpdateDeliverOrder = async () => {
        try {
            await updateDeliverRequest(values);
            refetch1(); 
            refetch2();
        } catch (error) {
            console.error('Failed to update pickup order', error);
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
                        <div onClick={handleUpdateDeliverOrder} className='font-bold cursor-pointer bg-mythemes-maingreen text-center text-white rounded-md'>
                        <h1 >Pick</h1>
                    </div>
            </TableCell>
        </TableRow>
    )
}
export default TableDeliverRequest
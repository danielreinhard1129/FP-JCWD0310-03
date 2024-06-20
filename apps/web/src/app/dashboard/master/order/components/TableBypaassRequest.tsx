'use client'
import { TableCell, TableRow } from '@/components/ui/table';
import useUpdateOrderWorker from '@/hooks/api/orderWorker/useUpdateOrderWorker';
import { FC } from 'react';

interface BypassRequestRowTableProps {
    key: number;
    orderWorkerId: number
    orderNumber: string
    weight: string
    price: string
    outlet: string
    station: string
    refetch: () => void
    isAccept: boolean
    isReject: boolean
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
    isReject
}) => {
    const { updateOrderWorker } = useUpdateOrderWorker()
    const acceptValues = {
        orderWorkerId,
        action: "accept"
    }
    const rejectValues = {
        orderWorkerId,
        action: "reject"
    }

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

    return (
        <TableRow key={key} >
            <TableCell>{orderNumber}</TableCell>
            <TableCell>{weight}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>{outlet}</TableCell>
            <TableCell>{station}</TableCell>
            <TableCell>
                {isAccept == true ? (
                    <div>
                        <button disabled className='py-0.5 bg-mythemes-dimgrey w-1/2 text-white font-bold'>Accepted</button>
                    </div>
                ) : (
                    ( isReject== true ? (
                        <div>
                            <button disabled className='py-0.5 bg-mythemes-dimgrey w-1/2 text-white font-bold'>Rejected</button>
                        </div>
                    ) : (
                        <div className='flex gap-2 w-40 justify-end'>
                            <button onClick={handleAccept} className='py-0.5 bg-mythemes-maingreen w-1/2 text-white font-bold'>Accept</button>
                            <button onClick={handleReject} className='py-0.5 bg-mythemes-maingreen w-1/2 text-white font-bold'>Reject</button>
                        </div>
                    ))
                )}
            </TableCell>
        </TableRow>
    )
}
export default TableBypassRequest
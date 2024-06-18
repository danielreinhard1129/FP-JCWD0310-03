'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useUpdateOrderStatus from '@/hooks/api/order/useUpdateStatusOrder';
import { OrderStatus } from '@/types/order.type';
import { FC, useState } from 'react';
import ItemCheckingDialog from './ItemCheckingDialog';

interface WashingCardProps {
  key: number;
  workerId: number;
  orderId: number;
  targetStatus: string;
  referenceNumber: string
  fullName: string
  email: string
  weight: number
  refetch: () => void
  buttonLabel: string
  isHistory: boolean
  isItemChecking: boolean
}

const WashingCard: FC<WashingCardProps> = ({
  key,
  workerId,
  orderId,
  targetStatus,
  referenceNumber,
  fullName,
  email,
  weight,
  refetch,
  buttonLabel,
  isHistory,
  isItemChecking,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const values = {
    orderId: Number(orderId),
    workerId: Number(workerId),
    orderStatus: targetStatus as OrderStatus
  }

  const { updateOrderStatus } = useUpdateOrderStatus()

  const handleUpdate = async () => {
    try {
      await updateOrderStatus(values);
      refetch();
    } catch (error) {
      console.error('Failed to update pickup order', error);
    }
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };



  return (
    <div key={key} className='relative flex flex-col gap-2 overflow-hidden shadow-md bg-white py-3 pl-5 pr-3 rounded-xl'>
      <div>
        <p className='text-gray-500 text-md font-bold align-top'>{referenceNumber}</p>
        <div className='flex gap-2'>
          <div className='my-auto'>
            <p className='text-md font-medium text-gray-700'>{fullName}</p>
            <p className='text-xs text-gray-500'>{email}</p>
          </div>
        </div>
      </div>
      <p className='font-bold absolute right-3 top-3 text-xs text-gray-500'>{weight} kg</p>
      {isHistory == false ? (
        <>
          <div className='absolute top-0 left-0 h-full w-2 bg-mythemes-secondarygreen'></div>
          {isItemChecking == false ? (
            <button onClick={handleUpdate} className='absolute right-3 bottom-3 bg-mythemes-maingreen font-bold text-sm text-white p-0.5 w-1/4 rounded-md'>{buttonLabel}</button>
          ) : (
            <>
              <button onClick={handleDialogOpen} className='absolute right-3 bottom-3 bg-mythemes-maingreen font-bold text-sm text-white p-0.5 w-1/4 rounded-md' >{buttonLabel}</button>
              <ItemCheckingDialog 
              isOpen={isDialogOpen} 
              onClose={handleDialogClose} 
              orderId={orderId}
              />
            </>
          )}
        </>
      ) : (
        <>
          <div className='absolute top-0 left-0 h-full w-2 bg-mythemes-dimgrey'></div>
          <div className='absolute right-3 bottom-3 bg-mythemes-dimgrey font-bold text-white p-0.5 w-1/4 text-sm text-center rounded-md'>{buttonLabel}</div>
        </>
      )}
    </div>
  )
}
export default WashingCard
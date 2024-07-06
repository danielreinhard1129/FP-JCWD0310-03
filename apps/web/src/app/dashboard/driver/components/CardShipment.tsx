'use client'
import useUpdateDeliveryOrder from '@/hooks/api/deliveryOrder/useUpdateDeliveryOrder';
import useUpdatePickupOrder from '@/hooks/api/pickupOrder/useUpdatePickupOrder';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface ShipmentCardProps {
  key: number;
  driverId: number;
  shipmentOrderId: number;
  status: string;
  referenceNumber: string
  fullName?: string
  email?: string
  refetch: () => void
  buttonLabel: string
  isHistory: boolean
  shipmentType: string
  distance: string
}

const ShipmentCard: FC<ShipmentCardProps> = ({
  key,
  driverId,
  shipmentOrderId,
  status,
  referenceNumber,
  fullName,
  email,
  refetch,
  buttonLabel,
  isHistory,
  shipmentType,
  distance
}) => {
  const router = useRouter()

  const handleClick = () => {
    if(shipmentType == "pickup"){
      router.push(`/dashboard/driver/pickup-details/${shipmentOrderId}`)
    } 
    if(shipmentType == "delivery"){
      router.push(`/dashboard/driver/delivery-details/${shipmentOrderId}`)
    }
  }

  return (
    <div key={key} className='relative flex overflow-hidden shadow-md bg-white py-3 px-5 rounded-xl'>
      <div>
        <p className='text-gray-500 text-md font-bold align-top'>{referenceNumber}</p>
        <div className='flex gap-2'>
          <div className='my-auto'>
            <p className='text-md font-medium text-gray-700'>{fullName}</p>
            <p className='text-xs text-gray-500'>{email}</p>
          </div>
        </div>
      </div>
      {isHistory == false ? (
        <>
          <div className='absolute top-0 left-0 h-full w-2 bg-mythemes-secondarygreen'></div>
          <p className='font-bold absolute right-3 top-3 text-xs text-gray-500'>{distance} km</p>
          <button onClick={handleClick} className='absolute right-3 bottom-3 bg-mythemes-maingreen font-bold text-sm text-white p-0.5 w-1/4 rounded-md'>{buttonLabel}</button>
        </>
      ) : (
        <>
          <div className='absolute top-0 left-0 h-full w-2 bg-green-200'></div>
          <div className='absolute right-3 bottom-3 bg-green-600 font-bold text-white p-0.5 w-1/4 text-sm text-center rounded-md'>{buttonLabel}</div>
        </>
      )}
    </div>
  )
}
export default ShipmentCard
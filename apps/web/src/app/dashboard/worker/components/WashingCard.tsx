'use client'
import useUpdateOrderStatus from '@/hooks/api/order/useUpdateStatusOrder';
import { OrderStatus } from '@/types/order.type';
import { FC, useEffect, useState } from 'react';
import ItemCheckingDialog from './ItemCheckingDialog';
import { EmployeeWorkShift } from '@/types/employee.type';
import { useRouter } from 'next/navigation';

interface WashingCardProps {
  key: number;
  workerId: number;
  orderId: number;
  targetStatus: string;
  referenceNumber: string
  fullName?: string
  email?: string
  weight: number
  refetch: () => void
  buttonLabel: string
  isHistory: boolean
  isItemChecking: boolean
  isBypassRequest: boolean
  isBypassAccepted: boolean
  isBypassRejected: boolean
  employeeWorkShift?: EmployeeWorkShift
}

const WashingCard: FC<WashingCardProps> = ({
  key,
  orderId,
  targetStatus,
  referenceNumber,
  fullName,
  email,
  weight,
  buttonLabel,
  isHistory,
  isBypassRequest,
  isBypassAccepted,
  isBypassRejected,
}) => {
  const router = useRouter()


  const handleClick = () => {
    let section
    if (targetStatus == OrderStatus.BEING_WASHED || targetStatus == OrderStatus.WASHING_COMPLETED) {
      section = "washing"
    }
    if (targetStatus == OrderStatus.BEING_IRONED || targetStatus == OrderStatus.IRONING_COMPLETED) {
      section = "ironing"
    }
    if (targetStatus == OrderStatus.BEING_PACKED || targetStatus == OrderStatus.AWAITING_PAYMENT) {
      section = "packing"
    }
    let progress
    if (isHistory == false) {
      if (targetStatus == OrderStatus.BEING_WASHED || targetStatus == OrderStatus.BEING_IRONED || targetStatus == OrderStatus.BEING_PACKED) {
        progress = "request"
      }
      if (targetStatus == OrderStatus.WASHING_COMPLETED || targetStatus == OrderStatus.IRONING_COMPLETED || targetStatus == OrderStatus.AWAITING_PAYMENT) {
        progress = "on-going"
      }
    }
    if (isHistory == true) {
      progress = "history"
    }
    router.push(`/dashboard/worker/bag-details/${orderId}/${section}/${progress}`)
  }
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
        (isBypassRequest == false ? (
          <>
            <div className='absolute top-0 left-0 h-full w-2 bg-mythemes-secondarygreen'></div>
            <button onClick={handleClick} className='absolute right-3 bottom-3 bg-mythemes-maingreen font-bold text-sm text-white p-0.5 w-1/4 rounded-md'>{buttonLabel}</button>
          </>
        ) : (
          (isBypassAccepted == true ? (
            <>
              <div className='absolute top-0 left-0 h-full w-2 bg-yellow-200'></div>
              <button onClick={handleClick} className='absolute right-3 bottom-3 bg-yellow-600 font-bold text-sm text-white p-0.5 w-1/4 rounded-md'>{buttonLabel}</button>
            </>
          ) : (
            (isBypassRejected == true ? (
              <>
                <div className='absolute top-0 left-0 h-full w-2 bg-red-200'></div>
                <button disabled className='absolute right-3 bottom-3 bg-red-600 font-bold text-sm text-white p-0.5 w-1/3 rounded-md'>Bypass Rejected</button>
              </>
            ) : (
              <>
                <div className='absolute top-0 left-0 h-full w-2 bg-mythemes-dimgrey'></div>
                <button disabled className='absolute right-3 bottom-3 bg-mythemes-dimgrey font-bold text-sm text-white p-0.5 w-1/3 rounded-md'>Bypass Requested</button>
              </>
            ))
          ))
        ))
      ) : (
        (isBypassRejected == true ? (
          <>
            <div className='absolute top-0 left-0 h-full w-2 bg-red-200'></div>
            <button disabled className='absolute right-3 bottom-3 bg-red-600 font-bold text-sm text-white p-0.5 w-1/3 rounded-md'>Bypass Rejected</button>
          </>
        ) : (
          <>
            <div className='absolute top-0 left-0 h-full w-2 bg-green-200'></div>
            <div className={`absolute right-3 bottom-3 bg-green-600 font-bold text-white p-0.5 w-1/4 text-sm text-center rounded-md`}>{buttonLabel}</div>
          </>
        ))
      )}
    </div>
  )
}
export default WashingCard
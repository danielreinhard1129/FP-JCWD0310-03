'use client'
import React from 'react'
import { FC } from 'react';

interface ShipmentCardProps {
    key: number;
    orderId: number;
    orderNumber: string;
    orderStatus: string;
    createAt: string;
}

const OrderCard: FC<ShipmentCardProps> = ({
    key,
    orderId,
    orderNumber,
    orderStatus,
    createAt,

}) => {


    return (
        <div key={key} className='relative flex overflow-hidden shadow-md bg-white py-3 px-5 rounded-xl'>
            <div>
                <p className='text-black text-sm font-bold align-top'>{orderNumber}</p>
                <div className='flex gap-2'>
                    <div className='my-auto'>
                        <p className='text-sm font-medium text-gray-700'>{orderStatus}</p>
                    </div>
                </div>
            </div>
            <p className='font-bold absolute right-3 top-3 text-xs text-gray-500'>{createAt}</p>
            <button className='absolute right-3 bottom-3 bg-mythemes-maingreen text-sm text-white w-1/4 rounded-md'>Details</button>
        </div>
    )
}
export default OrderCard
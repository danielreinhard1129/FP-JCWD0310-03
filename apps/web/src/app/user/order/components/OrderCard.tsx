'use client'
import useUpdateOrderStatus from '@/hooks/api/order/useUpdateStatusOrder';
import useCreatePayment from '@/hooks/api/payment/useCreatePayment';
import { OrderStatus } from '@/types/order.type';
import React from 'react'
import { FC } from 'react';

interface ShipmentCardProps {
    key: number;
    orderId: number;
    orderNumber: string;
    orderStatus: OrderStatus;
    createAt: string;
    refetch: () => void;
}

const OrderCard: FC<ShipmentCardProps> = ({
    key,
    orderId,
    orderNumber,
    orderStatus,
    createAt,
    refetch,

}) => {
    const values = {
        orderId: Number(orderId),
        orderStatus: OrderStatus.Laundry_Received_By_Customer
    }

    const payValues = {
        orderId: Number(orderId)
    }

    const { updateOrderStatus } = useUpdateOrderStatus()
    const { createPayment, data, isLoading } = useCreatePayment()
    
    
    const handleUpdate = async () => {
        try {
            await updateOrderStatus(values);
            refetch();
        } catch (error) {
            console.error('Failed to update pickup order', error);
        }
    };
    
    const handlePayment = async () => {
        try {
            const paymentData = await createPayment(payValues);
            if (!isLoading && paymentData) {
                if (window.snap) {
                    // window.snap.pay(`8dacd378-d696-4e85-9b63-95c3c8c4bbc1`);
                    window.snap.pay(`${paymentData.snapToken}`);
                } else {
                    alert('Snap is not loaded yet. Please try again.');
                }
            }                      
        } catch (error) {
            alert('Payment Error!')

        }
    }


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
            <div className='absolute top-0 left-0 h-full w-2 bg-mythemes-secondarygreen'></div>
            <p className='font-bold absolute right-3 top-3 text-xs text-gray-500'>{createAt}</p>
            {orderStatus == "Awaiting_Payment" ? (
                <button onClick={handlePayment} className='absolute right-3 bottom-3 bg-mythemes-maingreen text-sm text-white w-1/4 rounded-md'>Pay</button>
            ) : (
                (orderStatus == "Laundry_Being_Delivered_To_Customer" ? (
                    <button onClick={handleUpdate} className='absolute right-3 bottom-3 bg-mythemes-maingreen text-sm text-white w-1/4 rounded-md'>Confirm</button>
                ) : (
                    (orderStatus == 'Laundry_Received_By_Customer' ? (
                        <button className='absolute right-3 bottom-3 bg-green-600 text-sm text-white w-1/4 rounded-md'>Completed</button>
                    ) : (
                        <>
                            {/* <button className='absolute right-3 bottom-3 bg-mythemes-maingreen text-sm text-white w-1/4 rounded-md'>Details</button> */}
                        </>
                    ))
                ))
            )}
        </div>
    )
}
export default OrderCard
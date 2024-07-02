'use client'
import useUpdateOrderStatus from '@/hooks/api/order/useUpdateStatusOrder';
import useCreatePayment from '@/hooks/api/payment/useCreatePayment';
import { OrderStatus } from '@/types/order.type';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FC } from 'react';

interface OrderCardProps {
    key: number;
    orderId: number;
    orderNumber: string;
    orderStatus: OrderStatus;
    createAt: string;
    refetch: () => void;
    isPaid: boolean;
}

const OrderCard: FC<OrderCardProps> = ({
    key,
    orderId,
    orderNumber,
    orderStatus,
    createAt,
    refetch,
    isPaid

}) => {
    const router = useRouter();
    const values = {
        orderId: Number(orderId),
        orderStatus: OrderStatus.COMPLETED
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
            await createPayment(payValues);
            router.push(`/user/order/${orderId}/transaction`)
            // if (!isLoading && paymentData) {
            //     if (window.snap) {
            //         // window.snap.pay(`4a3f871a-2549-42ea-ae8d-36925130b3cc`);
            //         window.snap.pay(`${paymentData.snapToken}`);
            //     } else {
            //         alert('Snap is not loaded yet. Please try again.');
            //     }
            // }
        } catch (error) {
            alert('Payment Error!')

        }
    }


    return (
        <div onClick={() => router.push(`/user/order/${orderId}`)} key={key} className='relative flex overflow-hidden shadow-md bg-white py-3 px-5 rounded-xl'>
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
            {orderStatus === OrderStatus.AWAITING_PAYMENT
                || orderStatus === OrderStatus.READY_FOR_WASHING
                || orderStatus === OrderStatus.BEING_WASHED
                || orderStatus === OrderStatus.WASHING_COMPLETED
                || orderStatus === OrderStatus.BEING_IRONED
                || orderStatus === OrderStatus.IRONING_COMPLETED
                || orderStatus === OrderStatus.BEING_PACKED
                ? (
                    (isPaid == true ? (
                        <button disabled className='absolute z-40 right-3 bottom-3 bg-green-600 text-sm text-white w-1/4 rounded-md'>Paid</button>
                    ) : (
                        <button onClick={handlePayment} className='absolute z-40 right-3 bottom-3 bg-mythemes-maingreen text-sm text-white w-1/4 rounded-md'>Pay</button>
                    ))
                ) : (
                    (orderStatus == OrderStatus.RECEIVED_BY_CUSTOMER ? (
                        <button onClick={handleUpdate} className='absolute right-3 bottom-3 bg-mythemes-maingreen text-sm text-white w-1/4 rounded-md'>Confirm</button>
                    ) : (
                        (orderStatus == OrderStatus.COMPLETED ? (
                            <button disabled className='absolute right-3 bottom-3 bg-green-600 text-sm text-white w-1/4 rounded-md'>Completed</button>
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
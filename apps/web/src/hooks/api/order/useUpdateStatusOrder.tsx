'use client';

import { axiosInstance } from '@/lib/axios';
import { OrderStatus } from '@/types/order.type';
import { useState } from 'react';

interface UpdateOrderStatusArgs {
    orderId: number,
    workerId: number,
    orderStatus: OrderStatus,
}

const useUpdateOrderStatus = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateOrderStatus = async (payload: UpdateOrderStatusArgs) => {
        setIsLoading(true);
        try {            
            await axiosInstance.patch(`/orders/`, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { updateOrderStatus, isLoading };
};

export default useUpdateOrderStatus;
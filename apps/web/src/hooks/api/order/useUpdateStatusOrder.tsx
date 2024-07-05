'use client';

import { OrderStatus } from '@/types/order.type';
import { useState } from 'react';
import useAxios from '../useAxios';

interface UpdateOrderStatusArgs {
    orderId: number,
    workerId?: number,
    orderStatus: OrderStatus,
}

const useUpdateOrderStatus = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { axiosInstance } = useAxios();

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
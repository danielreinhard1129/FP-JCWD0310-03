'use client';

import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';

interface CreateDeliveryOrderArgs {
    orderId: number,
}

const useCreateDeliveryOrder = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createDeliveryOrder = async (payload: CreateDeliveryOrderArgs) => {
        setIsLoading(true);
        try {
            await axiosInstance.post(`/delivery-orders/`, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { createDeliveryOrder, isLoading };
};

export default useCreateDeliveryOrder;
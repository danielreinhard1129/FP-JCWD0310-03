'use client';

import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';

interface CreateOrderWorkerArgs {
    orderId: number,
    workerId: number,
    orderStatus: string
}

const useCreateOrderWorker = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createOrderWorker = async (payload: CreateOrderWorkerArgs) => {
        setIsLoading(true);
        try {
            await axiosInstance.post(`/order-workers/`, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { createOrderWorker, isLoading };
};

export default useCreateOrderWorker;
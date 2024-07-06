'use client';

import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';
import useAxios from '../useAxios';

interface CreateOrderWorkerArgs {
    orderId: number,
    workerId: number,
    orderStatus: string,
    bypassNote: string,
}

const useCreateOrderWorker = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { axiosInstance } = useAxios();

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
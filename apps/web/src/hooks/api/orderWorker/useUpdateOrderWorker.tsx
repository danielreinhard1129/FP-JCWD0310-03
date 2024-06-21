'use client';

import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';

interface UpdateOrderWorkerArgs {
    orderWorkerId: number,
    action: string
}

const useUpdateOrderWorker = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateOrderWorker = async (payload: UpdateOrderWorkerArgs) => {
        setIsLoading(true);
        try {
            await axiosInstance.patch(`/order-workers/`, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { updateOrderWorker, isLoading };
};

export default useUpdateOrderWorker;
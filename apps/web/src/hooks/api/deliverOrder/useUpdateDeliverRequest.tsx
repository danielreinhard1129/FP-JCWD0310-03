'use client';

import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';

interface UpdateDeliverRequestArgs {
    deliverOrderId: number,
    driverId: number,
}

const useUpdateDeliverRequest = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateDeliverRequest = async (payload: UpdateDeliverRequestArgs) => {
        setIsLoading(true);
        try {            
            await axiosInstance.patch(`/deliver-orders/request`, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { updateDeliverRequest, isLoading };
};

export default useUpdateDeliverRequest;
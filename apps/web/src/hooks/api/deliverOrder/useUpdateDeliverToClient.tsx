'use client';

import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';

interface UpdateDeliverToClientArgs {
    deliverOrderId: number,
    driverId: number,
}

const useUpdateDeliverToClient = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateDeliverToClient = async (payload: UpdateDeliverToClientArgs) => {
        setIsLoading(true);
        try {            
            await axiosInstance.patch(`/deliver-order/to-client`, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { updateDeliverToClient, isLoading };
};

export default useUpdateDeliverToClient;
'use client';

import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';

interface UpdatePickupToClientArgs {
    pickupOrderId: number,
    driverId: number,
}

const useUpdatePickupToClient = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updatePickupToClient = async (payload: UpdatePickupToClientArgs) => {
        setIsLoading(true);
        try {            
            await axiosInstance.patch(`/pickup-orders/to-client`, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { updatePickupToClient, isLoading };
};

export default useUpdatePickupToClient;
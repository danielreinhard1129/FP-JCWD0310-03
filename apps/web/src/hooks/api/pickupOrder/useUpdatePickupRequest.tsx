'use client';

import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';

interface UpdatePickupRequestArgs {
    pickupOrderId: number,
    driverId: number,
}

const useUpdatePickupRequest = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updatePickupRequest = async (payload: UpdatePickupRequestArgs) => {
        setIsLoading(true);
        try {            
            await axiosInstance.patch(`/pickup-orders/request`, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { updatePickupRequest, isLoading };
};

export default useUpdatePickupRequest;
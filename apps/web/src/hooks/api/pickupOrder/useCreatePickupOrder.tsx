'use client';

import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';

interface CreatePickupOrderArgs {
    outletId: number
    userId: number
    userAddressId: number
    pickupPrice?: number
    distance?: number
}

const useCreatePickupOrder = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createPickupOrder = async (payload: CreatePickupOrderArgs) => {
        setIsLoading(true);
        try {
            await axiosInstance.post(`/pickup-orders/`, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { createPickupOrder, isLoading };
};

export default useCreatePickupOrder;
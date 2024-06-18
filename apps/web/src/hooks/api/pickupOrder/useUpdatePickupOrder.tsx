'use client';

import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';

interface UpdatePickupOrderArgs {
    shipmentOrderId: number,
    driverId: number,
    status: string
}

const useUpdatePickupOrder = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updatePickupOrder = async (payload: UpdatePickupOrderArgs) => {
        setIsLoading(true);
        try {
            await axiosInstance.patch(`/pickup-orders/`, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { updatePickupOrder, isLoading };
};

export default useUpdatePickupOrder;
'use client';

import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';

interface UpdateStatusOrderArgs {
    pickupOrderId: number,
    driverId: number,
    status: string,
}

const useUpdateStatusOrder = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateStatusOrder = async (payload: UpdateStatusOrderArgs) => {
        setIsLoading(true);
        try {            
            await axiosInstance.patch(`/orders/`, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { updateStatusOrder, isLoading };
};

export default useUpdateStatusOrder;
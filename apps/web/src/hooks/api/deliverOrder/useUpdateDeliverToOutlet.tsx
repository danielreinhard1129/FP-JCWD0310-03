'use client';

import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';

interface UpdateDeliverToOutletArgs {
    deliverOrderId: number,
    driverId: number,
}

const useUpdateDeliverToOutlet = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateDeliverToOutlet = async (payload: UpdateDeliverToOutletArgs) => {
        setIsLoading(true);
        try {            
            await axiosInstance.patch(`/deliver-order/to-outlet`, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { updateDeliverToOutlet, isLoading };
};

export default useUpdateDeliverToOutlet;
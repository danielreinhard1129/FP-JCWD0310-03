'use client';

import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';

interface UpdatePickupToOutletArgs {
    pickupOrderId: number,
    driverId: number,
}

const useUpdatePickupToOutlet = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updatePickupToOutlet = async (payload: UpdatePickupToOutletArgs) => {
        setIsLoading(true);
        try {            
            await axiosInstance.patch(`/pickup-order/to-outlet`, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { updatePickupToOutlet, isLoading };
};

export default useUpdatePickupToOutlet;
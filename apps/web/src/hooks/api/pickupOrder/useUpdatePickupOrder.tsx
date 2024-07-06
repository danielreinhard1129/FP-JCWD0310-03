'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import useAxios from '../useAxios';
import { AxiosError } from 'axios';

interface UpdatePickupOrderArgs {
    shipmentOrderId: number,
    driverId: number,
    status: string
}

const useUpdatePickupOrder = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { axiosInstance } = useAxios();

    const updatePickupOrder = async (payload: UpdatePickupOrderArgs) => {
        setIsLoading(true);
        try {
            await axiosInstance.patch(`/pickup-orders/`, payload);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message || 'Something went wrong');
                console.log(error);
            }
        } finally {

            setIsLoading(false);
        }
    };
    return { updatePickupOrder, isLoading };
};

export default useUpdatePickupOrder;
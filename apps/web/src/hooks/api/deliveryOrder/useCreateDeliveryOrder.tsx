'use client';

import { useState } from 'react';
import useAxios from '../useAxios';
import { toast } from 'sonner';

interface CreateDeliveryOrderArgs {
    orderId: number,
}

const useCreateDeliveryOrder = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { axiosInstance } = useAxios();

    const createDeliveryOrder = async (payload: CreateDeliveryOrderArgs) => {
        setIsLoading(true);
        try {
            await axiosInstance.post(`/delivery-orders/`, payload);
            toast.success('Create Delivery Order Success !');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { createDeliveryOrder, isLoading };
};

export default useCreateDeliveryOrder;
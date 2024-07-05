'use client';

import { useState } from 'react';
import useAxios from '../useAxios';

interface UpdateDeliveryOrderArgs {
    shipmentOrderId: number,
    driverId: number,
    status: string
}

const useUpdateDeliveryOrder = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { axiosInstance } = useAxios();

    const updateDeliveryOrder = async (payload: UpdateDeliveryOrderArgs) => {
        setIsLoading(true);
        try {
            await axiosInstance.patch(`/delivery-orders/`, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { updateDeliveryOrder, isLoading };
};

export default useUpdateDeliveryOrder;
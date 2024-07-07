'use client';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import useAxios from '../useAxios';

interface UpdateOrderWorkerArgs {
    orderWorkerId: number,
    action: string
}

const useUpdateOrderWorker = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { axiosInstance } = useAxios();

    const updateOrderWorker = async (payload: UpdateOrderWorkerArgs) => {
        setIsLoading(true);
        try {
            await axiosInstance.patch(`/order-workers/`, payload);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message || 'Something went wrong');
                console.log(error);
            }
        } finally {
            setIsLoading(false);
        }
    };
    return { updateOrderWorker, isLoading };
};

export default useUpdateOrderWorker;
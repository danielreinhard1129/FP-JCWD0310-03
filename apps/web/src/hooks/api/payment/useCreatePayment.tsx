'use client';
import { Payment } from '@/types/payment.type';
import { useState } from 'react';
import useAxios from '../useAxios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface CreatePaymentArgs {
    orderId: number,
}

const useCreatePayment = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<Payment | null>(null);
    const { axiosInstance } = useAxios();

    const createPayment = async (payload: CreatePaymentArgs) => {
        setIsLoading(true);
        try {
            const { data } = await axiosInstance.post(`/payments/`, payload);
            setData(data)
            return data
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message || 'Something went wrong');
                console.log(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { data, createPayment, isLoading };
};

export default useCreatePayment;
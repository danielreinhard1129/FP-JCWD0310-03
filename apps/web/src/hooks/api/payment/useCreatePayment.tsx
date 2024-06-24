'use client';


import { Payment } from '@/types/payment.type';
import { useState } from 'react';
import useAxios from '../useAxios';
import { log } from 'console';

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
            console.log(error);
        } finally {
            setIsLoading(false);
        }        
    };
    
    return {data , createPayment, isLoading };
};

export default useCreatePayment;
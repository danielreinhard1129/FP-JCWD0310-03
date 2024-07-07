'use client';

import { Order } from '@/types/order.type';
import { AxiosError } from 'axios';

import { useRouter } from 'next/navigation';
import useAxios from '../useAxios';
import { toast } from 'sonner';
import { useState } from 'react';

interface CreateOrderArgs extends Pick<Order, 'weight'> {
  orderItem: [];
  pickupNumber: string;
}

const useCreateOrder = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const createOrder = async (payload: CreateOrderArgs) => {
    setIsLoading(false);
    try {
      await axiosInstance.post('/orders', payload);
      toast.success('Created Order Success !');
      router.push('/dashboard/master/order');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      }
    }finally {
      setIsLoading(false);
    }
  };
  return { createOrder, isLoading };
};

export default useCreateOrder;

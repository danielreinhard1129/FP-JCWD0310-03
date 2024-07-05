'use client';

import { useState } from 'react';
import useAxios from '../useAxios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface CreatePickupOrderArgs {
  outletId: number;
  userId: number;
  userAddressId: number;
  pickupPrice?: number;
  distance?: number;
}

const useCreatePickupOrder = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createPickupOrder = async (payload: CreatePickupOrderArgs) => {
    setIsLoading(true);
    try {
      await axiosInstance.post(`/pickup-orders/`, payload);
      toast.success('Thank you! Your order is being processed.');
      router.push('/user/pickup-order/pickup-detail');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { createPickupOrder, isLoading };
};

export default useCreatePickupOrder;

'use client';
import { PickupOrder } from '@/types/pickupOrder.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { toast } from 'sonner';

const useGetPickupOrder = (id: number) => {
  const [data, setData] = useState<PickupOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { axiosInstance } = useAxios();

  const getPickupOrder = async () => {
    try {
      const { data } = await axiosInstance.get<PickupOrder>(`/pickup-orders/${id}`);
      
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
    }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPickupOrder();
  }, []);
  return { pickupOrder: data, isLoading, refetch: getPickupOrder };
};

export default useGetPickupOrder;
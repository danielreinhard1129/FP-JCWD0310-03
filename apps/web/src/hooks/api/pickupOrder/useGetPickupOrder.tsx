'use client';
// import { axiosInstance } from '@/lib/axios';
import { PickupOrder } from '@/types/pickupOrder.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

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
        // TODO : replace console.log with toast
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
'use client';
import { DeliveryOrder } from '@/types/deliveryOrder.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

const useGetDeliveryOrder = (id: number) => {
  const [data, setData] = useState<DeliveryOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { axiosInstance } = useAxios();
  

  const getDeliveryOrder = async () => {
    try {
      const { data } = await axiosInstance.get<DeliveryOrder>(`/delivery-orders/${id}`);      
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
    getDeliveryOrder();
  }, []);
  return { deliveryOrder: data, isLoading, refetch: getDeliveryOrder };
};

export default useGetDeliveryOrder;
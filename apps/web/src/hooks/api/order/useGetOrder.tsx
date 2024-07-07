'use client';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { Order } from '@/types/order.type';

const useGetOrder = (id: number) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getOrder = async () => {
    try {
      const { data } = await axiosInstance.get<Order>(`/orders/${id}`);
      
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
    getOrder();
  }, []);
  return { data, isLoading, refetch: getOrder };
};

export default useGetOrder;

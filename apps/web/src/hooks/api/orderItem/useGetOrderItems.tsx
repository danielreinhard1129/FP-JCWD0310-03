'use client';

import { OrderItem } from '@/types/orderItem.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

interface GetOrderItemsQuery {
  orderId: number;
}

const useGetOrderItems = (queries: GetOrderItemsQuery) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getOrderItems = async () => {
    try {     
      const { data } = await axiosInstance.get('/order-items', {
        params: queries,
      })
      setData(data.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    };
  }

  useEffect(() => {
    getOrderItems();

  }, [queries.orderId]);

  return { data, isLoading, refetch: getOrderItems };
};

export default useGetOrderItems;
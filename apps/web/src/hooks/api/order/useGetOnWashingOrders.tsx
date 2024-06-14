'use client';
import { axiosInstance } from '@/lib/axios';
import { Order } from '@/types/order.type';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface IGetOrdersQuery extends IPaginationQueries {
  id: number;
}

const useGetOnWashingOrders = (queries: IGetOrdersQuery) => {
  const [data, setData] = useState<Order[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getOnWashingOrders = async () => {
    try {     
      const { data } = await axiosInstance.get('/orders/washing', {
        params: queries,
      })
      setData(data.data)
      setMeta(data.meta)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    };
  }

  useEffect(() => {
    getOnWashingOrders();

  }, [queries?.page, queries.id]);

  return { data, isLoading, meta, refetch: getOnWashingOrders };
};
export default useGetOnWashingOrders;
'use client';

import { Order } from '@/types/order.type';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

interface IGetOrdersQuery extends IPaginationQueries {
  id?: number;
  filterOutlet?: string,
  filterStatus?: string,
}

const useGetOrders = (queries: IGetOrdersQuery) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<Order[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getOrders = async () => {
    try {     
      const { data } = await axiosInstance.get('/orders', {
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
    getOrders();

  }, [queries?.filterOutlet, queries?.filterStatus, queries?.sortOrder, queries?.page, queries.id]);

  return { data, isLoading, meta, refetch: getOrders };
};

export default useGetOrders;
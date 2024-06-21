'use client';

import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { OrderWorker } from '@/types/orderWorker.type';

interface IGetOrderWorkersQuery extends IPaginationQueries {
  id: number;
  station?: string;
  isComplete?: number;
  bypassRequest?: number;
}

const useGetOrderWorkers = (queries: IGetOrderWorkersQuery) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<OrderWorker[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getOrderWorkers = async () => {
    try {     
      const { data } = await axiosInstance.get('/order-workers', {
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
    getOrderWorkers();

  }, [queries?.isComplete, queries?.station, queries?.sortOrder, queries?.page, queries.id]);

  return { data, isLoading, meta, refetch: getOrderWorkers };
};

export default useGetOrderWorkers;
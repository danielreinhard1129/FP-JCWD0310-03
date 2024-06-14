'use client';
import { axiosInstance } from '@/lib/axios';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { PickupOrder } from '@/types/pickupOrder.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface IGetPickupHistoriesQuery extends IPaginationQueries {
  id: number;
}

const useGetPickupHistories = (queries: IGetPickupHistoriesQuery) => {
  const [data, setData] = useState<PickupOrder[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPickupHistories = async () => {
    try {
      const { data } = await axiosInstance.get('/pickup-order/history',{
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
    getPickupHistories();
  
  }, [queries?.page, queries.id]);

  return { data, isLoading, meta, refetch: getPickupHistories };
};

export default useGetPickupHistories;
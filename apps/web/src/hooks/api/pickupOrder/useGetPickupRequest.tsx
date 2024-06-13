'use client';
import { axiosInstance } from '@/lib/axios';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { PickupOrder } from '@/types/pickupOrder.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface IGetPickupRequestQuery extends IPaginationQueries {
  id: number;
}

const useGetPickupRequest = (queries: IGetPickupRequestQuery) => {
  const [data, setData] = useState<PickupOrder[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPickupRequest = async () => {
    try {
      const { data } = await axiosInstance.get('/pickup-order/request',{
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
    getPickupRequest();
  
  }, [queries?.page, queries.id]);

  return { data, isLoading, meta, refetch: getPickupRequest };
};

export default useGetPickupRequest;
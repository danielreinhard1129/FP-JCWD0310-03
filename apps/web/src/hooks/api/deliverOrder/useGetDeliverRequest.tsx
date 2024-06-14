'use client';
import { axiosInstance } from '@/lib/axios';
import { DeliverOrder } from '@/types/deliverOrder.type';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface IGetDeliverRequestQuery extends IPaginationQueries {
  id: number;
}

const useGetDeliverRequest = (queries: IGetDeliverRequestQuery) => {
  const [data, setData] = useState<DeliverOrder[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDeliverRequest = async () => {
    try {
      const { data } = await axiosInstance.get('/deliver-orders/request',{
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
    getDeliverRequest();
  
  }, [queries?.page, queries.id]);

  return { data, isLoading, meta, refetch: getDeliverRequest };
};

export default useGetDeliverRequest;
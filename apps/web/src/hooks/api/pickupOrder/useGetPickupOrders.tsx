'use client';
import { axiosInstance } from '@/lib/axios';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { PickupOrder } from '@/types/pickupOrder.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface IGetPickupOrdersQuery extends IPaginationQueries {
  id: number;
}

const useGetPickupOrders = (queries: IGetPickupOrdersQuery) => {
  const [data, setData] = useState<PickupOrder[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPickupOrders = async () => {
    try {
      const { data } = await axiosInstance.get('/pickupOrder/',{
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
    getPickupOrders();
  
  }, [queries?.page, queries.id]);

  return { data, isLoading, meta, refetch: getPickupOrders };
};

export default useGetPickupOrders;
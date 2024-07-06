'use client';
// import { axiosInstance } from '@/lib/axios';
import { DeliveryOrder } from '@/types/deliveryOrder.type';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

interface IGetDeliveryOrdersQuery extends IPaginationQueries {
  deliveryStatus?: string;
  isClaimedbyDriver?: number;
  latitude?: number | null;
  longitude?: number | null;
}

const useGetDeliveryOrders = (queries: IGetDeliveryOrdersQuery) => {
  const [data, setData] = useState<any[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { axiosInstance } = useAxios();

  const getDeliveryOrders = async () => {
    try {
      const { data } = await axiosInstance.get('/delivery-orders/',{
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
    getDeliveryOrders();
  
  }, [queries.page, queries.take]);

  return { data, isLoading, meta, refetch: getDeliveryOrders };
};

export default useGetDeliveryOrders;
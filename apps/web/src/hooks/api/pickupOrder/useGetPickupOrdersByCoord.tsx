'use client';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import useAxios from '../useAxios';

interface IGetPickupOrdersQuery extends IPaginationQueries {
  pickupStatus?: string;
  isOrderCreated?: number;
  isClaimedbyDriver?: number;
  latitude?: number | null;
  longitude?: number | null;
}

const useGetPickupOrdersByCoord = (queries: IGetPickupOrdersQuery) => {
  const [data, setData] = useState<any[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { axiosInstance } = useAxios();  

  const getPickupOrders = async () => {
    try {
      if(queries.latitude != null &&queries.longitude !=null){
        const { data } = await axiosInstance.get('/pickup-orders/',{
          params: queries,
        })      
        setData(data.data)
        setMeta(data.meta)
      }
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
  }, [queries.latitude, queries.longitude, queries.page, queries.take]);

  return { data, isLoading, meta, refetch: getPickupOrders };
};

export default useGetPickupOrdersByCoord;
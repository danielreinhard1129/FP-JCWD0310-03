'use client';
import { axiosInstance } from '@/lib/axios';
import { DeliverOrder } from '@/types/deliverOrder.type';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface IGetDeliverHistoriesQuery extends IPaginationQueries {
  id: number;
}

const useGetDeliverHistories = (queries: IGetDeliverHistoriesQuery) => {
  const [data, setData] = useState<DeliverOrder[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDeliverHistories = async () => {
    try {
      const { data } = await axiosInstance.get('/delivery-orders/history', {
        params: queries,
      });
      setData(data.data);
      setMeta(data.meta);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDeliverHistories();
  }, [queries?.page, queries.id]);

  return { data, isLoading, meta, refetch: getDeliverHistories };
};

export default useGetDeliverHistories;

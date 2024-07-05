'use client';

import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { Payment } from '@/types/payment.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

interface IGetPaymentsQuery extends IPaginationQueries {
    filterOutlet: string;
    filterMonth: string;
    filterYear: string;
}

const useGetPayments = (queries: IGetPaymentsQuery) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<Payment[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPayments = async () => {
    try {     
      const { data } = await axiosInstance.get('/payments', {
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
    getPayments();

  }, [queries.filterMonth, queries.filterYear, queries.filterOutlet, queries?.sortOrder, queries?.page, ]);

  return { data, isLoading, meta, refetch: getPayments };
};

export default useGetPayments;
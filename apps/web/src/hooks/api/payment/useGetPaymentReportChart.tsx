'use client';

import { IPaginationMeta } from '@/types/pagination.type';
import { Payment } from '@/types/payment.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

interface GetPaymentChartQuery{
  id: number;
  filterOutlet: string;
  filterMonth: string;
  filterYear: string;
}

const useGetPaymentChart = (queries: GetPaymentChartQuery) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<Payment[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPaymentChart = async () => {
    try {     
      const { data } = await axiosInstance.get('/payments/report-chart', {
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
    getPaymentChart();

  }, [queries.id]);

  return { data, isLoading, meta, refetch: getPaymentChart };
};

export default useGetPaymentChart;
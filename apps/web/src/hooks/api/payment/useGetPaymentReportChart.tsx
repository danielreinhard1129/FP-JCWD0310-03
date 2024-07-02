'use client';

import { IPaginationMeta } from '@/types/pagination.type';
import { Payment } from '@/types/payment.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

interface PaymentChartData {
  payments: Payment[];
  totalIncome: number;
  totalTransaction: number;
  totalWeight: number;
  incomeMonthly: number[];
  transactionMonthly: number[];
  weightMonthly: number[];
  incomeDaily: number[];
  transactionDaily: number[];
  weightDaily: number[];
}

interface PaymentChartResponse {
  data: PaymentChartData;
}

interface GetPaymentChartQuery{
  // id: number;
  filterOutlet: string;
  filterMonth: string;
  filterYear: string;
}

const useGetPaymentChart = (queries: GetPaymentChartQuery) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<PaymentChartData | null>(null);
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

  }, [queries.filterMonth, queries.filterYear, queries.filterOutlet]);

  return { data, isLoading, meta, refetch: getPaymentChart };
};

export default useGetPaymentChart;
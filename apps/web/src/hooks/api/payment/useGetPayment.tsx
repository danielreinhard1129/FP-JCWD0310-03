'use client';
import { Payment } from '@/types/payment.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

interface IGetPaymentQuery {
  id?: number
  orderId?: number  
}

const useGetPayment = (queries: IGetPaymentQuery) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getPayment = async () => {
    try {
      const { data } = await axiosInstance.get<Payment>(`/payments/order`,
        {
          params: queries,
        }
      );
      
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        // TODO : replace console.log with toast
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
 
  useEffect(() => {
    getPayment();
  }, []);
  return { data, isLoading, refetch: getPayment };
};

export default useGetPayment;

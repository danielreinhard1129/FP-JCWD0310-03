'use client';

import { LaundryItem } from '@/types/laundryItem.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import useAxios from '../useAxios';

const useGetLaundryItem = (id: number) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<LaundryItem | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const getLaundryItem = async () => {
    try {
      const { data } = await axiosInstance.get(`/laundry-items/${id}`);
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getLaundryItem();
  }, []);
  return { laundryItem: data, isLoading, refetch: getLaundryItem };
};
export default useGetLaundryItem;

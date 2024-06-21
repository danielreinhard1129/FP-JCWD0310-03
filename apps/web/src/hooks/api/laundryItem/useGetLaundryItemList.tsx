'use client';
// import { axiosInstance } from '@/lib/axios';
import { LaundryItem } from '@/types/laundryItem.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

const useGetLaundryItemList = () => {
  const { axiosInstance } = useAxios();
  const [isData, setIsData] = useState<LaundryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getLaundryItemList = async () => {
    try {
      const { data } = await axiosInstance.get(`/laundry-items`);
      setIsData(data.data);
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
    getLaundryItemList();
  }, []);
  return { isData, isLoading, refetch: getLaundryItemList };
};

export default useGetLaundryItemList;

'use client';
// import { axiosInstance } from '@/lib/axios';
import { LaundryItem } from '@/types/laundryItem.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

interface IGetItemLaundryQuery {
  isDelete?: number;
}

const useGetLaundryItemList = (queries: IGetItemLaundryQuery) => {
  const { axiosInstance } = useAxios();
  const [isData, setIsData] = useState<LaundryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getLaundryItemList = async () => {
    try {
      const { data } = await axiosInstance.get(`/laundry-items`, { params: queries });
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
  }, [queries?.isDelete]);
  return { isData, isLoading, refetch: getLaundryItemList };
};

export default useGetLaundryItemList;

'use client';
// import { axiosInstance } from '@/lib/axios';
import { LaundryItem } from '@/types/laundryItem.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { da } from '@faker-js/faker';

interface IGetItemLaundryQuery extends IPaginationQueries {
  search?: string;
  isDelete?: number;
}

const useGetLaundryItemList = (queries: IGetItemLaundryQuery) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<LaundryItem[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getLaundryItemList = async () => {
    try {
      const { data } = await axiosInstance.get(`/laundry-items`, {
        params: queries,
      });
      setMeta(data.meta);
      setData(data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLaundryItemList();
  }, [
    queries.page,
    queries.search,
    queries.take,
    queries.sortOrder,
    queries.isDelete,
  ]);
  return { data, isLoading, meta, refetch: getLaundryItemList };
};

export default useGetLaundryItemList;

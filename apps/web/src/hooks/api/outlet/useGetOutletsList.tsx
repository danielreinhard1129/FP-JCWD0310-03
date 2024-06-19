'use client';
// import { axiosInstance } from '@/lib/axios';
import { Outlet } from '@/types/outlet.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';

interface IGetOutletsQuery extends IPaginationQueries {
  search?: string;
}

const useGetOutletList = (queries: IGetOutletsQuery) => {
  const [data, setData] = useState<Outlet[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { axiosInstance } = useAxios();

  const getOutlet = async () => {
    try {
      const { data } = await axiosInstance.get(`/outlets`, { params: queries });

      setData(data.data);
      setMeta(data.meta);
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
    getOutlet();
  }, [queries.page, queries.search]);
  return { data, isLoading, refetch: getOutlet };
};

export default useGetOutletList;

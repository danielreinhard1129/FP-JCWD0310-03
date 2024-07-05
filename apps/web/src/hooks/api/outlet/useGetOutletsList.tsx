'use client';
// import { axiosInstance } from '@/lib/axios';
import { Outlet } from '@/types/outlet.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { toast } from 'sonner';

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
        toast.error(error.response?.data);
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOutlet();
  }, [queries.page, queries.search, queries.take, queries.sortOrder]);
  return { data, isLoading, meta, refetch: getOutlet };
};

export default useGetOutletList;

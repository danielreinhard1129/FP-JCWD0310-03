'use client';
// import { axiosInstance } from '@/lib/axios';
import { Employee } from '@/types/employee.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { Outlet } from '@/types/outlet.type';

const useGetOutlet = (id: number) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<Outlet | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getOutlet = async () => {
    try {
      const { data } = await axiosInstance.get<Outlet>(`/outlets/${id}`);
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
    getOutlet();
  }, []);
  return { outlet: data, isLoading, refetch: getOutlet };
};

export default useGetOutlet;

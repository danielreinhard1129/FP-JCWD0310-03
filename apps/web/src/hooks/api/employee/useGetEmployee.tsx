'use client';
// import { axiosInstance } from '@/lib/axios';
import { Employee } from '@/types/employee.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

const useGetEmployee = (id: number) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getEmployee = async () => {
    try {
      const { data } = await axiosInstance.get<Employee>(`/employees/${id}`);
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
    getEmployee();
  }, []);
  return { employee: data, isLoading, refetch: getEmployee };
};

export default useGetEmployee;

'use client';
// import { axiosInstance } from '@/lib/axios';
import { Employee } from '@/types/employee.type';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

interface IGetEmployeesQuery extends IPaginationQueries {
  filterOutlet?: string
  filterRole?: string
}

const useGetEmployees = (queries: IGetEmployeesQuery) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<Employee[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getEmployees = async () => {
    try {
      const { data } = await axiosInstance.get('/employees',{
        params: queries,
      });
      setData(data.data);
      setMeta(data.meta);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, [queries?.page, queries.filterOutlet, queries.filterRole]);

  return { data, isLoading, meta, refetch: getEmployees };
};

export default useGetEmployees;

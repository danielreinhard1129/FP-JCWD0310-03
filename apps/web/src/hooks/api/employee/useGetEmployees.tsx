'use client';
import { axiosInstance } from '@/lib/axios';
import { Employee } from '@/types/employee.type';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface IGetEmployeesQuery extends IPaginationQueries {
  id: number;
}

const useGetEmployees = (queries: IGetEmployeesQuery) => {
  const [data, setData] = useState<Employee[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getEmployees = async () => {
    try {
      const { data } = await axiosInstance.get('/employee/employees',{
        params: queries,
      })
      setData(data.data)
      setMeta(data.meta)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    };
  }

  useEffect(() => {
    getEmployees();
  
  }, [queries?.page, queries.id]);

  return { data, isLoading, meta, refetch: getEmployees };
};

export default useGetEmployees;
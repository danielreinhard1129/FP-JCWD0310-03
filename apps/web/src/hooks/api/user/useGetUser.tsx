'use client';
import { Employee } from '@/types/employee.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { IFormUser, User } from '@/types/user.type';

const useGetUser = () => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get<User>(`/user/profile/`);
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return { user: data, isLoading, refetch: getUser };
};

export default useGetUser;

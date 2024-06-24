'use client';
// import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

interface UserResult {
  fullname: string;
  email: string;
}

interface AddressResult {
  user: UserResult;
  addressLine: string;
  isPrimary: boolean;
  id: number;
}


const useGetUserAddress = (id: number) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<AddressResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserAddress = async () => {
    try {
      const { data } = await axiosInstance.get(`/address/user/${id}`);
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
    getUserAddress();
  }, [id]);
  return { address: data, isLoading, refetch: getUserAddress };
};

export default useGetUserAddress;

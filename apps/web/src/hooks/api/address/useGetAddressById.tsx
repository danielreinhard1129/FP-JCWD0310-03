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
  city: string;
  isPrimary: boolean;
  latitude: string;
  longitude: string;
  id: number;
}

const useGetAddressById = (id: number) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<AddressResult | null>();
  const [isLoading, setIsLoading] = useState(true);

  const getAddressById = async () => {
    try {
      const response = await axiosInstance.get(`/address/${id}`);
      setData(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAddressById();
  }, [id]);
  return { address: data, isLoading, refetch: getAddressById };
};

export default useGetAddressById;

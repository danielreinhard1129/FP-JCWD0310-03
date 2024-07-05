'use client';
// import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface UserResult {
  fullname: string;
  email: string;
}

interface AddressResult {
  user: UserResult;
  latitude: string;
  longitude: string;
  addressLine: string;
  isPrimary: boolean;
  id: number;
}

const useGetUserAddress = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<AddressResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserAddress = async () => {
    try {
      const { data } = await axiosInstance.get(`/address/user/`);
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.status === 401 &&
          error.response.data === 'token expired'
        ) {
          toast.error('Your token has expired. Please Login.');
          router.push('/login');
        }
        toast.error(error.response?.data);
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserAddress();
  }, []);
  return { address: data, isLoading, refetch: getUserAddress };
};

export default useGetUserAddress;

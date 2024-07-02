'use client';

import { Address } from '@/types/address.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import useAxios from '../useAxios';

const useCreateUserAddress = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createUserAddress = async (payload: Partial<Address>) => {
    setIsLoading(true);
    try {
      await axiosInstance.post(`/address`, payload);

      toast.success('Create Address Success !');
      router.push(`/user/profile`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || 'Something went wrong');
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { createUserAddress, isLoading };
};

export default useCreateUserAddress;

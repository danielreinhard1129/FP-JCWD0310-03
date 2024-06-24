'use client';

// import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import useAxios from '../useAxios';

interface FormUpdateAddressArgs {
  addressLine: string;
  city: string;
  latitude: string;
  longitude: string;
  isPrimary: boolean;
}

const useUpdateUserAddress = (id: number) => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateUserAddress = async (payload: Partial<FormUpdateAddressArgs>) => {
    setIsLoading(true);
    try {
      await axiosInstance.patch(`/address/${id}`, payload);
      toast.success('Update Address Success !');
      router.back();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { updateUserAddress, isLoading };
};

export default useUpdateUserAddress;

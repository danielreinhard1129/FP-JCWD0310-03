'use client';

import { useRouter } from 'next/navigation';
import useAxios from '../useAxios';
import { useState } from 'react';
import { LaundryItem } from '@/types/laundryItem.type';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

// interface UpdateItemArgs extends Pick<LaundryItem, 'itemName'> {}

const useUpdateLaundryItem = (id: number) => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const updateLaundryItem = async (payload: Partial<LaundryItem>) => {
    setIsLoading(true);
    try {
      await axiosInstance.patch(`/laundry-items/${id}`, { ...payload });
      console.log('ini pay dan id', payload, id);

      toast.success('Update laundry item success !');
      router.push('/dashboard/master/laundry-item');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { updateLaundryItem, isLoading };
};
export default useUpdateLaundryItem;

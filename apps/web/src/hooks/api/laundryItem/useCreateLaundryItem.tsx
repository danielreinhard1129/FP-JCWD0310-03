'use client';
import { LaundryItem } from '@/types/laundryItem.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useAxios from '../useAxios';

interface CreateItem extends Pick<LaundryItem, 'itemName'> {}

const useCreateLaundyItem = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  const createLaundryItem = async (payload: CreateItem) => {
    try {
      await axiosInstance.post('/laundry-items', payload);

      toast.success('Create laundry item success !');
      router.push('/dashboard/master/laundry-item');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    }
  };
  return { createLaundryItem };
};
export default useCreateLaundyItem;

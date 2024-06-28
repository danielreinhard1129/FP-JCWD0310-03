'use client';

import { AxiosError } from 'axios';
import useAxios from '../useAxios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const useDeleteLaundryItem = (id: number) => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const deleteLaundryItem = async () => {
    try {
      await axiosInstance.delete(`/laundry-items/${id}`);
      toast.success('Delete laundry item success !');
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };
  return { deleteLaundryItem };
};
export default useDeleteLaundryItem;

'use client';

import { AxiosError } from 'axios';
import useAxios from '../useAxios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const useDeleteUserAddress = (id: number) => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const deleteUserAddress = async () => {
    try {
      await axiosInstance.delete(`/address/${id}`);
      toast.success('Delete Address Success !');
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };
  return { deleteUserAddress };
};
export default useDeleteUserAddress;

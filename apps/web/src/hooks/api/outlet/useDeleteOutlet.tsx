'use client';
import { Outlet } from '@/types/outlet.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FileWithPath } from 'react-dropzone';
import { toast } from 'sonner';
import useAxios from '../useAxios';
import { useState } from 'react';

const useDeleteOutlet = (id: number) => {
  const [isLoading, setIsloading] = useState(false);
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const deleteOutlet = async () => {
    setIsloading(true);
    try {
      await axiosInstance.delete<Outlet>(`/outlets/${id}`);

      toast.success('Update outlet success !');
      router.push('/dashboard/master/outlet');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };
  return { deleteOutlet, isLoading };
};
export default useDeleteOutlet;

'use client';
import { Outlet } from '@/types/outlet.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FileWithPath } from 'react-dropzone';
import { toast } from 'sonner';
import useAxios from '../useAxios';
import { useState } from 'react';

interface UpdateOutletArgs {
  outletName: string;
  outletType: string;
  addressLine: string;
  city: string;
  latitude: string;
  longitude: string;
}

const useUpdateOutlet = (id: number) => {
  const [isLoading, setIsloading] = useState(false);
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const updateOutlet = async (payload: Partial<UpdateOutletArgs>) => {
    setIsloading(true);
    try {
      await axiosInstance.patch<Outlet>(`/outlets/${id}`, payload);

      toast.success('Update outlet success !');
      router.push('/dashboard/master/outlet');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };
  return { updateOutlet, isLoading };
};
export default useUpdateOutlet;

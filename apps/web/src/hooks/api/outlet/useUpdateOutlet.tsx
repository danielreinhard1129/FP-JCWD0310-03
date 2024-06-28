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
  outletImage: File[];
  addressLine: string;
  city: string;
}

const useUpdateOutlet = (id: number) => {
  const [isLoading, setIsloading] = useState(false);
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const updateOutlet = async (payload: Partial<UpdateOutletArgs>) => {
    setIsloading(true);
    try {
      const { outletName, outletType, outletImage, addressLine, city } =
        payload;

      const createOutletForm = new FormData();

      if (outletName) createOutletForm.append('outletName', outletName);
      if (outletType) createOutletForm.append('outletType', outletType);
      if (addressLine) createOutletForm.append('addressLine', addressLine);
      if (city) createOutletForm.append('city', city);
      outletImage?.forEach((file: FileWithPath) => {
        createOutletForm.append('outletImage', file);
      });

      await axiosInstance.patch<Outlet>(`/outlets/${id}`, createOutletForm);

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

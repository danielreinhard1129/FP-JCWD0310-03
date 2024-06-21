'use client';
import { IFormOutlet, Outlet } from '@/types/outlet.type';
import { FileWithPath } from 'react-dropzone';
import useAxios from '../useAxios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { data } from 'cypress/types/jquery';
import { AxiosError } from 'axios';
import exp from 'constants';
import { useState } from 'react';

interface createOutletArgs {
  outletName: string;
  outletType: string;
  outletImage: File[];
  addressLine: string;
  city: string;
}

const useCreateOutlet = () => {
  //   const [isLoading, setIsloading] = useState(false);
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const createOutlet = async (payload: createOutletArgs) => {
    // setIsloading(true);
    try {
      const { outletName, outletType, outletImage, addressLine, city } =
        payload;

      const createOutletForm = new FormData();

      createOutletForm.append('outletName', outletName);
      createOutletForm.append('outletType', outletType);
      createOutletForm.append('addressLine', addressLine);
      createOutletForm.append('city', city);
      outletImage?.forEach((file: FileWithPath) => {
        createOutletForm.append('outletImage', file);
      });

      await axiosInstance.post<Outlet>('/outlets', createOutletForm);

      toast.success('Create outlet success !');
      router.push('/dashboard/master/outlet');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
      console.log(error);
    }
  };
  return { createOutlet };
};
export default useCreateOutlet;

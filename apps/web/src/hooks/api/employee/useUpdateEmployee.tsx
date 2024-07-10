'use client';

import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import useAxios from '../useAxios';

interface updateEmployeeArgs {
  workShift: string;
  station: string;
  outletId: string;
  fullName?: string;
  email?: string;
  role?: string;
}

const useUpdateEmployee = (employeeId: number) => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateEmployee = async (payload: any) => {
    setIsLoading(true);
    try {
      await axiosInstance.patch(`/employees/${employeeId}`, {
        ...payload,
      });
      toast.success('Edit Employee Success !');
      router.push('/dashboard/master/employee');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { updateEmployee, isLoading };
};

export default useUpdateEmployee;

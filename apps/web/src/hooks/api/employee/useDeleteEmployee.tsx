'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAxios from '../useAxios';

 
const useDeleteEmployee = (employeeId: number) => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteEmployee = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/employees/${employeeId}`);
      router.push('/dashboard/master/employee');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { deleteEmployee, isLoading };
};

export default useDeleteEmployee;

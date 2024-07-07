'use client';

import { cn } from '@/lib/utils';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';

import { useRouter } from 'next/navigation';
import useAxios from '../useAxios';
import { toast } from 'sonner';
import { useState } from 'react';

interface AddEmployeeArgs
  extends Pick<User, 'email' | 'fullName' | 'password' > {
  outletId?: string;
  isVerify?: boolean;
  role: string
}

const useAddEmployee = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const addEmployee = async (payload: AddEmployeeArgs) => {
    setIsLoading(true);
    try {
      await axiosInstance.post('/employees', payload);

      toast.success('Add Employee Success !');
      router.push("/dashboard/master/employee");
    } catch (error) {          
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
        console.log(error);
        
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { addEmployee, isLoading };
};

export default useAddEmployee;

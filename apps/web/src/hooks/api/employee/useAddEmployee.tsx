'use client';

import { toast } from '@/components/ui/use-toast';
// import { axiosInstance } from '@/lib/axios';
import { cn } from '@/lib/utils';
import { EmployeeStation, EmployeeWorkShift } from '@/types/employee.type';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';

import { useRouter } from 'next/navigation';
import useAxios from '../useAxios';

interface AddEmployeeArgs
  extends Pick<User, 'email' | 'fullName' | 'password' > {
  outletId?: string;
  isVerify?: boolean;
  role: string
}

const useAddEmployee = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const addEmployee = async (payload: AddEmployeeArgs) => {
    try {
      await axiosInstance.post('/employees', payload);
      router.push("/dashboard/master/employee");
    } catch (error) {          
      if (error instanceof AxiosError) {
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-16 md:right-4 border-mythemes-darkpink text-mythemes-darkpink',
          ),
          variant: 'default',
          title: error?.response?.data,
        });
      }
    }
  };
  return { addEmployee };
};

export default useAddEmployee;

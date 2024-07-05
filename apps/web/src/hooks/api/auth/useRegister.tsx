'use client';

// import { axiosInstance } from '@/lib/axios';
import { cn } from '@/lib/utils';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import useAxios from '../useAxios';
import { toast } from 'sonner';
import { useState } from 'react';

interface RegisterResponses {
  message: string;
  data: User;
}

interface RegisterArgs extends Pick<User, 'email'> {}

const useRegister = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const register = async (payload: RegisterArgs) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post<RegisterResponses>(
        '/auth/register',
        payload,
      );
      toast.success(data.message);
      router.push('/login');
    } catch (error) {
      if (error instanceof AxiosError) {
        // FIXME = change alert to toast
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
};

export default useRegister;

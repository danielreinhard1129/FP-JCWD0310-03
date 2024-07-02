'use client';

import { axiosInstance } from '@/lib/axios';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface IForgotPassArgs extends Pick<User, 'email'> {}
interface IForgotPassResponse {
  message: string;
}
const useForgotPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const forgotPassword = async (payload: IForgotPassArgs) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.post<IForgotPassResponse>(
        '/auth/forgot-password',
        payload,
      );

      toast.success(data.message);

      router.replace('/login');
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { forgotPassword, isLoading };
};

export default useForgotPassword;

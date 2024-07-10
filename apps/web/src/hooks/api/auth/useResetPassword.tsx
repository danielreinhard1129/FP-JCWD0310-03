'use client';

import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface ResetPasswordResponse {
  message: string;
}
const useResetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async (password: string, token: string) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.patch<ResetPasswordResponse>(
        '/auth/reset-password',
        { password },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success(data.message);

      router.replace('/user');
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { resetPassword, isLoading };
};

export default useResetPassword;

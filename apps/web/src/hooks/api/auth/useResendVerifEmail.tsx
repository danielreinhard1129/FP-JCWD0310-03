'use client';

import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slices/userSlice';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import useAxios from '../useAxios';

interface ResendVerifEmailResponse {
  message: string;
  data: User;
}

const useResendVerifEmail = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const resendVerifEmail = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.patch(`/auth/resend-verif-email`);

      dispatch(loginAction(data));
      toast.success('Verification email has been sent to your email');
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { resendVerifEmail, isLoading };
};

export default useResendVerifEmail;

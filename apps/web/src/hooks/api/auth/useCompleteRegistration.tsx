'use client';

// import { axiosInstance } from '@/lib/axios';
import { IFormUser, User } from '@/types/user.type';
import { AxiosError } from 'axios';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useAxios from '../useAxios';
import { toast } from 'sonner';
import { FileWithPath } from 'react-dropzone';

interface CompleteRegistrationResponse {
  message: string;
  data: User;
}

const useCompleteRegistration = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const completeRegistration = async (payload: IFormUser) => {
    setIsLoading(true);
    try {
      await axiosInstance.post<User>(`/auth/complete-registration`, payload);

      toast.message('Verification email has been sent to your email');
      router.push('/login');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { completeRegistration, isLoading };
};

export default useCompleteRegistration;
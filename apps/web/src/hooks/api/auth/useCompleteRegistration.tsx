'use client';

import { toast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { cn } from '@/lib/utils';
import { loginAction } from '@/redux/slices/userSlice';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface CompleteRegistrationResponse {
  message: string;
  data: User;
  token: string;
}

interface CompleteRegistrationArgs
  extends Pick<User, 'email' | 'fullName' | 'password'> {}

const useCompleteRegistration = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const completeRegistration = async (payload: CompleteRegistrationArgs) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post<CompleteRegistrationResponse>(
        `/auth/complete-registration`,
        { ...payload },
      );
      dispatch(loginAction(data.data));
      localStorage.setItem('token', data.token);
      router.push('/');
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
    } finally {
      setIsLoading(false);
    }
  };
  return { completeRegistration, isLoading };
};

export default useCompleteRegistration;

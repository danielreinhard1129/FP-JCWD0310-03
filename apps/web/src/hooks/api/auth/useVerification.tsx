'use client';

// import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import useAxios from '../useAxios';
interface VerificationArgs {
  password: string | null;
  token: string | null;
}
const useVerification = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
    router.push('/');
  };

  const verification = async (payload: VerificationArgs) => {
    setIsLoading(true);
    try {
      console.log('ini payload', payload);
      const { data } = await axiosInstance.post('auth/verification', payload, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      });
      logout();
      toast.success('Your account has been verified !');
      router.push('/login');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.status === 401 &&
          error.response.data === 'token expired'
        ) {
          toast.error('Your token has expired. Resend verification email.');
        } else {
          toast.error(error.response?.data || 'An error occurred.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { verification, isLoading };
};

export default useVerification;
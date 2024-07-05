'use client';

// import { axiosInstance } from '@/lib/axios';

import { loginAction } from '@/redux/slices/userSlice';
import { Role, User } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import useAxios from '../useAxios';
import { useState } from 'react';

interface LoginResponses {
  message: string;
  data: User;
  token: string;
}

interface LoginArgs {
  role?: Role;
  password?: string;
  email: string;
}
const useLogin = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (payload: LoginArgs) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post<LoginResponses>(
        '/auth/login',
        payload,
      );

      dispatch(loginAction(data.data));
      localStorage.setItem('token', data.token);
      if (data.data.role === Role.CUSTOMER) {
        router.push('/user');
      }
      if (data.data.role === Role.DRIVER) {
        router.push('/dashboard/driver');
      }
      if (data.data.role === Role.OUTLET_ADMIN) {
        router.push('/dashboard/master');
      }
      if (data.data.role === Role.SUPER_ADMIN) {
        router.push('/dashboard/master');
      }
      if (data.data.role === Role.WORKER) {
        router.push('/dashboard/worker');
      }
      toast.success(data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};

export default useLogin;

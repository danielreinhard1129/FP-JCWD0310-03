'use client';

import { toast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { cn } from '@/lib/utils';
import { loginAction } from '@/redux/slices/userSlice';
import { Role, User } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

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
  const router = useRouter();
  const dispatch = useDispatch();
  const login = async (payload: LoginArgs) => {
    try {
      const { data } = await axiosInstance.post<LoginResponses>(
        '/auth/login',
        payload,
      );

      dispatch(loginAction(data.data));
      localStorage.setItem('token', data.token);
      if (data.data.role === Role.CUSTOMER) {
        router.back;
      }
      if (data.data.role === Role.DRIVER) {
        router.push('/driver');
      }
      if (data.data.role === Role.OUTLET_ADMIN) {
        router.push('/outlet-admin');
      }
      if (data.data.role === Role.SUPER_ADMIN) {
        router.push('/super-admin');
      }
      if (data.data.role === Role.WORKER) {
        router.push('/worker');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // FIXME = change alert to toast
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

  return { login };
};

export default useLogin;

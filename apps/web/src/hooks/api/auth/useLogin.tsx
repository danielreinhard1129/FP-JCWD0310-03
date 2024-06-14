'use client';

// import { axiosInstance } from '@/lib/axios';

import { loginAction } from '@/redux/slices/userSlice';
import { Role, User } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import useAxios from '../useAxios';

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
  const login = async (payload: LoginArgs) => {
    try {
      const { data } = await axiosInstance.post<LoginResponses>(
        '/auth/login',
        payload,
      );

      dispatch(loginAction(data.data));
      localStorage.setItem('token', data.token);
      if (data.data.role === Role.CUSTOMER) {
        router.push('/');
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
      toast(data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        // toast.error(error?.response?.data);
        console.log(error);
      }
    }
  };

  return { login };
};

export default useLogin;

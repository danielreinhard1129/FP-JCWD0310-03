// /* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/redux/slices/userSlice';
import useAxios from '../useAxios';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export default function useLoginByGoogle() {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const response = await axiosInstance.post('/auth/google', { code });
        const { data } = response;

        setUser(data);
        dispatch(loginAction(data.data));
        localStorage.setItem('token', data.token);

        toast.success('Login by Google Succes');
        router.push('/');
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data);
        }
      }
    },
    flow: 'auth-code',
  });

  const logout = () => {
    googleLogout();
    setUser(null);
  };

  return { googleLogin, logout, user };
}

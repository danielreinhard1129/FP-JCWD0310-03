// /* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/redux/slices/userSlice';

export default function useLoginByGoogle() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        console.log('ini coderesponse', code);
        const response = await axiosInstance.post('/auth/google', { code });
        const { data } = response;

        setUser(data);
        dispatch(loginAction(data.data));
        localStorage.setItem('token', data.token);

        router.push('/');
      } catch (error) {
        console.error('Error:', error);
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

/* eslint-disable react-hooks/rules-of-hooks */
'use client';
// import useGoogleLogin from './useGoogleLogin';
import { axiosInstance } from '@/lib/axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function useLoginByGoogle() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  // const dispatch = useDispatch();
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      console.log('ini coderesponse', code);
      const tokens = await axiosInstance.post('/auth/google', {
        code,
      });
      // dispatch(loginAction(code.));
      console.log('ini tokens', tokens.data.id_token);
      router.push('/');
    },
    flow: 'auth-code',
  });
  const logout = () => {
    googleLogout();
    setUser(null);
  };
  return { googleLogin, logout };
}

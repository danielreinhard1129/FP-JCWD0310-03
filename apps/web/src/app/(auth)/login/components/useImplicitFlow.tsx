'use client';
import { useState } from 'react';
import { useGoogleLogin, TokenResponse } from '@react-oauth/google';
import axios from 'axios';
import { string } from 'zod';

export default function useImplicitFlow() {
  const [tokenResponse, setTokenResponse] = useState<TokenResponse | null>();
  const [user, setUser] = useState<any>(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      setTokenResponse(tokenResponse);
      setUser(userInfo);
      console.log('ini user info', tokenResponse);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return { googleLogin };
}

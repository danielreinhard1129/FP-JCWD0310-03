'use client';
import { Button } from '@/components/ui/button';
import useResendVerifEmail from '@/hooks/api/auth/useResendVerifEmail';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';
import React from 'react';

const ResendVerifEmail = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);
  console.log('ini id', id);

  const { resendVerifEmail } = useResendVerifEmail();

  // const logout = () => {
  //   localStorage.removeItem('token');
  //   dispatch(logoutAction());
  // };
  return (
    <div>
      <Button
        type="submit"
        onClick={() => {
          resendVerifEmail();
        }}
      >
        resen
      </Button>
    </div>
  );
};

export default ResendVerifEmail;

'use client';
import Image from 'next/image';
import logo from '../../../../public/Kucekin_Logo_Black_EVO1.png';

import { useRouter, useSearchParams } from 'next/navigation';
import FormResetPassword from './components/FormResetPassword';
import useResetPassword from '@/hooks/api/auth/useResetPassword';
import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { stat } from 'fs';

interface IFormEditUser {
  password: string;
}

const ResetPassword: React.FC = () => {
  const { resetPassword, isLoading: isLoadingResetPassword } =
    useResetPassword();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();


  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values: Partial<IFormEditUser>) => {
    resetPassword(String(values.password), String(token));
    console.log('ini pay', values.password);
  };
  return (
    <main className=" fixed container overflow-hidden top-0 bg-[#f4f4f4] p-0 w-screen left-0 right-0 z-50">
      <div className="bg-mythemes-secondarygreen rounded-full size-96 absolute -z-10 -left-48"></div>
      <div className="bg-mythemes-secondarygreen rounded-full size-96 absolute -z-10 -right-48 mt-96"></div>
      <div className="container h-screen justify-center">
        <div className="w-28 mx-auto ">
          <Image
            alt=""
            src={logo}
            objectFit="contain"
            onClick={() => router.push('/')}
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mt-24">Create Your Account.</h1>
          <FormResetPassword
            initialValues={initialValues}
            isLoading={isLoadingResetPassword}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;

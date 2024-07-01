/* eslint-disable react/no-unescaped-entities */
'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import logo from '../../../../../public/Kucekin_Logo_Black_EVO1.png';
import FormVerification from './components/FormVerification';
import useVerification from '@/hooks/api/auth/useVerification';

interface IFormVerification {
  password?: string;
  token?: string;
}

const Verification = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const token = searchParams.get('token');

  // const { verification } = useVerification();

  // const handleSubmit = (values: Partial<IFormVerification>) => {
  //   if (token && values.password) {
  //     const payload = (values.password, token);
  //     verification(payload);
  //   } else {
  //     console.error('Token or password is missing');
  //   }
  // };

  //   const handleSubmit = (values: Partial<IFormVerification>) => {
  // const payload = (String(values.password),String(values.token))
  //     verification(payload);
  //   };

  return (
    <main className=" relative overflow-hidden top-0 p-0 min-h-screen  left-0 right-0 z-50">
      <div className="bg-mythemes-secondarygreen rounded-full size-96 absolute -z-10 -left-48 "></div>
      <div className="bg-mythemes-taubmans rounded-full size-96 absolute -z-10 -right-48 mt-96"></div>
      {/* <div className="container h-screen justify-center"> */}
      <div className="container justify-center">
        <div className="w-28 mx-auto ">
          <Image
            alt=""
            src={logo}
            objectFit="contain"
            className="cursor-pointer"
            onClick={() => router.push('/')}
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mt-24">
            You're almost there!{' '}
            <span className="font-normal text-lg">
              Verify your account now.
            </span>
          </h1>
          <FormVerification  />
        </div>
      </div>
    </main>
  );
};

export default Verification;

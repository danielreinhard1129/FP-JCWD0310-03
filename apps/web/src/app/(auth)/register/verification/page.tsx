/* eslint-disable react/no-unescaped-entities */
'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../../../../../public/Kucekin_Logo_Black_EVO1.png';
import { FormVerification } from './components/FormVerification';

const Verification = () => {
  const router = useRouter();
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
          <h1 className="text-4xl font-bold mt-24">
            You're almost there!{' '}
            <span className="font-normal text-xl">Verify your account now.</span>
            
          </h1>
          <FormVerification />
        </div>
      </div>
    </main>
  );
};

export default Verification;

'use client';
import Image from 'next/image';
import logo from '../../../../public/Kucekin_Logo_Black_EVO1.png';
import { FormRegister } from './components/FormRegister';
import { useRouter } from 'next/navigation';
import LoggedIn from '@/hoc/LoggedIn';

const Register = () => {
  const router = useRouter();
  return (
    <main className=" relative overflow-hidden top-0 p-0  left-0 right-0 z-50 min-h-screen">
      <div className="bg-mythemes-mainYellow rounded-full size-96 absolute -z-10 -left-48 "></div>
      <div className="bg-mythemes-tertiarygreen rounded-full size-96 absolute -z-10 -right-48 mt-96"></div>
      <div className="px-6 justify-center">
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
          <FormRegister />
        </div>
    
      </div>
    </main>
  );
};

export default LoggedIn(Register);

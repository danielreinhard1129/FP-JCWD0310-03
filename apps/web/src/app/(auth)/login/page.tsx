'use client';
import Image from 'next/image';
import logo from '../../../../public/Kucekin_Logo_Black_EVO1.png';
import { FromLogin } from './components/FormLogin';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  return (
    <main className=" relative overflow-hidden top-0 p-0 min-h-screen  left-0 right-0 z-50">
      <div className="bg-mythemes-secondaryblue rounded-full size-96 absolute -z-10 -left-48 "></div>
      <div className="bg-mythemes-mainYellow rounded-full size-96 absolute -z-10 -right-48 mt-96"></div>
      {/* <div className="px-6 h-screen justify-center"> */}
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
          <h1 className="text-3xl font-bold mt-24">Hello 👋</h1>
          <p>Welcome back. You have been missed during this time.</p>
          <FromLogin />
        </div>
      </div>
    </main>
  );
};

export default Login;
 
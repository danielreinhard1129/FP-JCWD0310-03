'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import logo from '../../../../../public/Kucekin_Logo_Black_EVO1.png';
import { CompleteRegistrationForm } from './components/FormCompleteRegistration';

const AddEmployee = () => {
  const searchParams = useSearchParams();
  let emailParams = searchParams.get('email');

  const router = useRouter();

  const initialValues = {
    email: emailParams || '',
  };

  return (
    <main className=" relative overflow-hidden min-h-screen top-0 p-0  left-0 right-0 z-50">
      <div className="bg-mythemes-secondaryblue rounded-full size-96 absolute -z-10 -left-48 "></div>
      <div className="bg-mythemes-mainYellow rounded-full size-96 absolute -z-10 -right-48 mt-96"></div>
      <div className="px-6  justify-center">
        <div className="w-28 mx-auto ">
          <Image
            alt=""
            src={logo}
            objectFit="contain"
            onClick={() => router.push('/')}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mt-24">
            Complete your signup to get started.
          </h1>
          <CompleteRegistrationForm initialValues={initialValues} />
        </div>
      </div>
    </main>
  );
};

export default AddEmployee;

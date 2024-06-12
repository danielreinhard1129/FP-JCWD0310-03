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
    // <div className="flex flex-col">
    //   <div className="p-6 flex gap-2 my-auto ">
    //     <Link className="my-auto" href={'/dashboard-super-admin/menu-employee'}>
    //       <ChevronLeft />
    //     </Link>
    //     <h1 className="text-lg font-bold my-auto">Add New Employee</h1>
    //   </div>
    //   <div className="mx-8 mb-8 p-5 w-8/12 rounded-xl bg-mythemes-secondarygreen">
    //     <CompleteRegistrationForm initialValues={initialValues} />
    //   </div>
    // </div>

    <main className="  h-screen top-0 bg-[#f4f4f4] p-0 w-screen left-0 right-0 z-50">
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
          <CompleteRegistrationForm initialValues={initialValues} />
        </div>
      </div>
    </main>
  );
};

export default AddEmployee;

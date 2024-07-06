'use client';

import WorkerAuthGuard from '@/hoc/WorkerAuthGuard';
import { useAppSelector } from '@/redux/hooks';
import { BASE_API_URL } from '@/utils/config';
import { Bell } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import noPic from '../../../../public/pictNotFound.jpeg';

const DashboardWorker = () => {
  const { id, email, fullName, role, isVerify, profilePic, tokenExpiresIn } =
    useAppSelector((state) => state.user);
  return (
    <div className="min-h-screen flex flex-col gap-4 bg-mythemes-grey container px-0">
      <div className="px-6 bg-mythemes-maingreen text-white rounded-b-3xl py-6 flex flex-col gap-4 h-28">
        <div className="flex relative">
          <div
            className="w-10 h-10 rounded-full border-2 my-auto justify-center relative overflow-hidden mx-auto "
          // onClick={() => router.push(`/user/profile`)}
          >
            <Image
              alt="ProfilePict"
              src={
                profilePic
                  ? profilePic.includes('googleusercontent.com')
                    ? profilePic
                    : `${BASE_API_URL}/assets${profilePic}`
                  : noPic.src
              }
              quality={80}
              objectFit="cover"
              fill
              loading="lazy"
              className="mx-auto"
            />
          </div>
          <div className="my-auto">
            <h1 className="font-semibold text-xs text-gray-500">
              Hello Anthony,
            </h1>
            <h1 className="font-bold text-sm ">Welcome Back!</h1>
          </div>
          <div className="absolute right-0 top-1 my-auto flex h-8 rounded-full border border-gray-400 px-2">
            <Link className="h-5 text-mythemes-maingreen my-auto" href={'/dashboard/worker/notification'} >
              <Bell className="h-5 text-mythemes-maingreen my-auto" />
            </Link>
          </div>
        </div>
      </div>


      <div className='px-6'>



        <div className="overflow-hidden h-10 relative flex gap-2">
          <div className="h-8 my-auto aspect-square rounded-full bg-mythemes-secondarygreen"></div>
          <div className="my-auto">
            <h1 className="font-semibold text-xs text-gray-500">
              Hello Anthony,
            </h1>
            <h1 className="font-bold text-sm ">Welcome Back!</h1>
          </div>
          <div className="absolute right-0 top-1 my-auto flex h-8 rounded-full border border-gray-400 px-2">
            <Link className="h-5 text-mythemes-maingreen my-auto" href={'/dashboard/worker/notification'} >
              <Bell className="h-5 text-mythemes-maingreen my-auto" />
            </Link>
          </div>
        </div>
        <div className="h-40 bg-white rounded-xl shadow-md"></div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Your Jobs</h1>
          <div className="flex gap-3">
            <Link
              className="flex w-1/2 h-16 bg-mythemes-secondarygreen rounded-xl shadow-md"
              href={'/dashboard/worker/washing/request'}
            >
              <h1 className="mx-auto my-auto font-bold text-gray-600">Washing</h1>
            </Link>
            <Link
              className="flex w-1/2 h-16 bg-mythemes-secondarygreen rounded-xl shadow-md"
              href={'/dashboard/worker/ironing/request'}
            >
              <h1 className="mx-auto my-auto font-bold text-gray-600">Ironing</h1>
            </Link>
            <Link
              className="flex w-1/2 h-16 bg-mythemes-secondarygreen rounded-xl shadow-md"
              href={'/dashboard/worker/packing/request'}
            >
              <h1 className="mx-auto my-auto font-bold text-gray-600">Packing</h1>
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
};

export default WorkerAuthGuard(DashboardWorker);

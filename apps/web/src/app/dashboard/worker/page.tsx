'use client';

import WorkerAuthGuard from '@/hoc/WorkerAuthGuard';
import { useAppSelector } from '@/redux/hooks';
import { BASE_API_URL } from '@/utils/config';
import { Bell, LucidePackageCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import noPic from '../../../../public/pictNotFound.jpeg';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { TbIroning, TbWash } from 'react-icons/tb';

const DashboardWorker = () => {
  const { id, email, fullName, role, isVerify, profilePic, tokenExpiresIn } =
    useAppSelector((state) => state.user);
  const router = useRouter();

  const currentDate = format(new Date(), 'ccc, dd MMM yyyy');

  function capitalize(str: string) {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return (
    <section className="min-h-screen p-0 container relative mx-auto flex flex-col gap-4 mb-5">
      <div className="px-6 bg-gradient-green text-white rounded-b-3xl py-6 flex flex-col justify-between h-28">
        <div className="flex justify-between items-start h-20">
          <p className=" text-sm font-bold">{currentDate}</p>
          <div>
            <div className="flex flex-col gap-4 items-center">
              <div className=" bg-white/20 p-1 rounded-full">
                <Bell
                  className="flex flex-col items-center gap-1 text-white cursor-pointer"
                  onClick={() => router.push(`/dashboard/worker/notification`)}
                  size={20}
                />
              </div>
              <p className="font-bold text-xs">{capitalize(fullName)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-6">
        <h1 className="font-bold text-gray-800">Your Jobs</h1>
        <div className="flex flex-col gap-3">
          <div
            className="flex items-center bg-gradient-one py-4 px-12 rounded-xl cursor-pointer hover:bg-mythemes-mainblue transition duration-300 ease-in-out"
            onClick={() => router.push('/dashboard/worker/washing/request')}
          >
            <TbWash className="h-6 w-6 text-white mr-3" />
            <h1 className="font-bold text-white text-lg">Washing Station</h1>
          </div>
          <div
            className="flex items-center bg-gradient-two py-4 px-12 rounded-xl cursor-pointer hover:bg-mythemes-mainblue transition duration-300 ease-in-out"
            onClick={() => router.push('/dashboard/worker/ironing/request')}
          >
            <TbIroning className="h-6 w-6 text-white mr-3" />
            <h1 className="font-bold text-white text-lg">Ironing Station</h1>
          </div>
          <div
            className="flex items-center bg-gradient-three py-4 px-12 rounded-xl cursor-pointer hover:bg-mythemes-mainblue transition duration-300 ease-in-out"
            onClick={() => router.push('/dashboard/worker/packing/request')}
          >
            <LucidePackageCheck className="h-6 w-6 text-white mr-3" />
            <h1 className="font-bold text-white text-lg">Packing Station</h1>
          </div>
        </div>
      </div>

    </section>
  );
};

export default WorkerAuthGuard(DashboardWorker);

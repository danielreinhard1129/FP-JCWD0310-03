'use client';
import useGetOutlet from '@/hooks/api/outlet/useGetOutlet';
import { useAppSelector } from '@/redux/hooks';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import image from '../../../../../../public/Kucekin_Logo_Black_EVO1.png';
import { BASE_API_URL } from '@/utils/config';
import SuperAdminGuard from '@/hoc/SuperAdminGuard';

const OutletDetail = () => {
  const { id } = useAppSelector((state) => state.user);
  const { outlet } = useGetOutlet(Number(id));
  return (
    <div className="flex flex-col">
      <div className="p-6 flex gap-2 my-auto ">
        <Link className="my-auto" href={'/dashboard/master/employee'}>
          <ChevronLeft />
        </Link>
      </div>
      <div className="p-6 grid grid-cols-3 bg-mythemes-grey">
        <div className="p-4">
          {/* <Label className=" font-bold text-lg">Outlet Image</Label> */}
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 h-full p-4 bg-mythemes-taubmans rounded-xl">
            <div className="place-content-center">
              <label className="font-bold text-md">Outlet Name</label>
              <p className="text-lg ">lalalalallalalala</p>
            </div>
            <div className="place-content-center">
              <label className="font-bold text-md">Outlet Type</label>
              <p className="text-lg ">MAIN</p>
            </div>
            <div className="place-content-center">
              <label className="font-bold text-md">Outlet Address</label>
              <p className="text-lg ">Pogung</p>
            </div>
            <div className="place-content-center">
              <label className="font-bold text-md">City</label>
              <p className="text-lg ">Sleman</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminGuard(OutletDetail);

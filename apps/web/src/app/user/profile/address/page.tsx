'use client';
import { Separator } from '@/components/ui/separator';
import useGetUserAddress from '@/hooks/api/user/useGetUserAddress';
import { useAppSelector } from '@/redux/hooks';
import 'leaflet/dist/leaflet.css';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CardAddress from './components/CardAddress';
import AddAddress from './components/AddAddress';

const UserAddress = () => {
  const { address, isLoading, refetch } = useGetUserAddress();
  const router = useRouter();

  return (
    <main className="px-6 p-0 pt-[32px]  bg-[#ffff]">
      {/* // <main className={`container p-0 pt-[32px] ${h > h-screen ? 'h-full' : 'h-full'} bg-[#ffff]`}> */}
      <div className=" flex flex-col gap-4  ">
        <div className="flex  relative">
          <ChevronLeft className="absolute" onClick={() => router.back()} />
          <div className=" flex justify-between w-full">
            <h1 className=" font-extrabold ml-8">Address Detail</h1>
            <h1 className=" place-content-center font-bold text-sm text-mythemes-maingreen ">
              <AddAddress />
            </h1>
          </div>
        </div>
        <Separator />
        {address.map((address, index) => (
          <CardAddress
            id={address.id}
            key={index}
            addressLine={address.addressLine}
            isPrimary={address.isPrimary === true ? 'Primary' : ''}
            refetch={refetch}
          />
        ))}
      </div>
    </main>
  );
};

export default UserAddress;

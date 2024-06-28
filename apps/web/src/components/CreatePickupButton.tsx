'use client';
import { useAppSelector } from '@/redux/hooks';
import { CirclePlus, Home, Search, Shirt, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CreatePickupButton = () => {
  const { id, isVerify } = useAppSelector((state) => state.user);
  const router = useRouter();
  return (
    <>
      <div className="container max-w-[430px] fixed bottom-0 py-2 place-items-center mx-auto flex flex-row gap-4 justify-between bg-white ">
        <Home
          className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
          onClick={() => router.push('/user')}
        />
        <Shirt className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer" />
        <CirclePlus
          size={50}
          className="flex flex-col items-center gap-1 text-mythemes-maingreen cursor-pointer"
          onClick={() => router.push(`/user/request-pickup`)}
        />
        <Search className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer" />
        <User
          className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
          onClick={() => router.push(`user/profile/${id}`)}
        />
      </div>
    </>
  );
};
export default CreatePickupButton;

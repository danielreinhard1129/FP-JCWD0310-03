'use client';
import { useAppSelector } from '@/redux/hooks';
import { Bell, CirclePlus, Home, Search, Shirt, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const CreatePickupButton = () => {
  const { id, isVerify } = useAppSelector((state) => state.user);
  const router = useRouter();
  return (
    <>
      <div className="container max-w-[430px] sticky py-2 place-items-center mx-auto flex flex-row gap-4 justify-between bg-white bottom-3">
        <Home
          className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
          onClick={() => router.push('/user')}
        />
        {/* <Shirt
          className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
          onClick={() => router.push('/user/order')}
        /> */}
        <CirclePlus
          size={50}
          className=" text-mythemes-maingreen cursor-pointer absolute left-1/2 transform -translate-x-1/2"
          onClick={() => {
            isVerify === false
              ? (toast.error('Please verify your account to continue !'),
                router.push('/user'))
              : router.push(`/user/request-pickup`);
          }}
        />

        <User
          className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
          onClick={() => router.replace(`/user/profile`)}
        />
      </div>
    </>
  );
};
export default CreatePickupButton;

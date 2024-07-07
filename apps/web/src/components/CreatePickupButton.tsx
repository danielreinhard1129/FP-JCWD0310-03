'use client';
import { useAppSelector } from '@/redux/hooks';
import { Role } from '@/types/user.type';
import { Bell, CirclePlus, Home, Search, Shirt, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const CreatePickupButton = () => {
  const { id, isVerify, role } = useAppSelector((state) => state.user);
  const router = useRouter();
  return (
    <>
      <div className="container max-w-[430px] h-14 sticky py-2 place-items-center mx-auto flex flex-row gap-4 justify-between bg-white bottom-0">
        {role==Role.CUSTOMER?(
          <Home
            className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
            onClick={() => router.push('/user')}
          />
        ):(
          <Bell
            className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
            onClick={() => {
              role == Role.DRIVER ? router.push('/dashboard/driver/notification'): router.push('/dashboard/worker/notification')
            }}
          />

        )}
        {role==Role.CUSTOMER?(
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
        ):(
          <Home
          size={40}
            className=" text-mythemes-maingreen cursor-pointer absolute left-1/2 transform -translate-x-1/2"   
            onClick={()=>{
              role == Role.DRIVER ? router.push('/dashboard/driver'): router.push('/dashboard/worker')
            }}       
          />
        )}

        <User
          className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
          onClick={() => router.replace(`/user/profile`)}
        />
      </div>
    </>
  );
};
export default CreatePickupButton;

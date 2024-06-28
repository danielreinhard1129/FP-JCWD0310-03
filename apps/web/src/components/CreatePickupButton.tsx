'use client';
import { useAppSelector } from '@/redux/hooks';
import { Bell, CirclePlus, Home, Search, Shirt, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CreatePickupButton = () => {
  const { id, isVerify } = useAppSelector((state) => state.user);
  const router = useRouter();

  // const handleClick = () => {
  //   if (!id) {
  //     toast.warning('Please Login');
  //     router.push('/login');
  //   } else if (isVerify === false) {
  //     router.push('/login');
  //   } else {
  //     router.push('/outlet');
  //   }
  // };

  return (
    <>
      {/* <div className="flex mx-auto fixed bottom-0"> */}
      <div className="container sticky bottom-0 py-2 place-items-center mx-auto flex flex-row gap-4 justify-between bg-white ">
        <Home
          className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
          onClick={() => router.push('/')}
        />

        {/* <div
          className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
          onClick={() =>
            !id
              ? (toast.warning('Please login to continue'),
                router.push('/login'))
              : router.push('/order-list')
          }
        > */}
        <Shirt className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer" />
        {/* </div> */}

        <CirclePlus
          size={50}
          className="flex flex-col items-center gap-1 text-mythemes-maingreen cursor-pointer"
        />

        <Bell className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
         onClick={() => router.push(`/notification`)}/>

        <User
          className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
          onClick={() => router.push(`/profile/${id}`)}
        />
      </div>
    </>
  );
};
export default CreatePickupButton;

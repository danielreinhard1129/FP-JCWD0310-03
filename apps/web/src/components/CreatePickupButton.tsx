'use client';
import { useAppSelector } from '@/redux/hooks';
import { CirclePlus, Home, Search, Shirt, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

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
      <div className="container fixed bottom-0  left-1/2 transform py-1 -translate-x-1/2 place-items-center mx-auto flex flex-row gap-4 justify-between bg-white ">
        <div
          className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <Home />
          <p className="text-sm ">Home</p>
        </div>
        <div
          className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
          // onClick={() =>
          //   !id
          //     ? (toast.warning('Please login to continue'),
          //       router.push('/login'))
          //     : router.push('/order-list')
          // }
        >
          <Shirt />
          <p className="text-sm">Order</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer">
          <CirclePlus />
          <p className="text-sm">Order Pickup</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer">
          <Search />
          <p className="text-sm">Search</p>
        </div>
        <div
          className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
          onClick={() => router.push(`/profile/${id}`)}
        >
          <User />
          <p className="text-sm">Profile</p>
        </div>
      </div>
    </>
  );
};
export default CreatePickupButton;

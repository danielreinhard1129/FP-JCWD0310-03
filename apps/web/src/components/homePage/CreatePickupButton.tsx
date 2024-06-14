import React from 'react';
import { Button } from '../ui/button';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { toast, Toaster } from 'sonner';

const CreatePickupButton = () => {
  const { id, isVerify } = useAppSelector((state) => state.user);
  const router = useRouter();

  const handleClick = () => {
    if (!id) {
      //   toast({
      //     className: cn(
      //       'top-0 right-0 flex fixed md:max-w-[420px] md:top-16 md:right-4 border-mythemes-darkpink text-mythemes-darkpink',
      //     ),
      //     variant: 'default',
      //     title: 'Please Login !',
      //   });
      toast.warning('Please Login');

      router.push('/login');
    } else if (isVerify === false) {
      router.push('/login');
    } else {
      router.push('/outlet');
    }
  };

  return (
    <>
      <Button
        className="bg-main_green text-white p-6 md:text-xl sticky bottom-5  mx-auto font-bold h-8 hover:bg-secondary_green hover:border-b-0"
        onClick={handleClick}
      >
        Kucekin your clothes now <Plus />
      </Button>
    </>
  );
};
export default CreatePickupButton;

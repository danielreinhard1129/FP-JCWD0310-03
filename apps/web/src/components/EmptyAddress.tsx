'use client'
import { Navigation } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EmptyAddress = () => {
  const router = useRouter();
  return (
    <main>
      <div className="bg-mythemes-secondaryblue h-screen bg-opacity-10 place-content-center container">
        <div className="justify-center flex mb-5">
          <Navigation size={'200px'} className="text-mythemes-secondaryblue" />
        </div>
        <div className="flex flex-col items-center gap-5">
          <p className="text-xl font-bold text-mythemes-maingreen text-center ">
            Please complete your address to continue.
          </p>
          <div className="">
            <Button
              className="bg-mythemes-maingreen font-bold"
              onClick={() => router.replace('/user')}
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EmptyAddress;

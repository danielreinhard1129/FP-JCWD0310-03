import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, Loader2 } from 'lucide-react';
import React from 'react';

const SkeletonDetails = () => {
  return (
    <div>
      <div className='flex flex-col gap-4 container p-4 bg-white px-6'>
        <div className='relative flex gap-2'>
          <ChevronLeft className='absolute h-6 my-auto' />
          <Skeleton className='w-48 h-8 mx-auto' />
        </div>
      </div>
      <div className='flex flex-col gap-4 container bg-mythemes-grey px-6 min-h-screen py-6'>
        <div className='flex flex-col gap-2 p-6 rounded-xl shadow-lg bg-white'>
          <div className='flex flex-col pb-4'>
            <div className='flex gap-2 justify-start'>
              <Skeleton className='w-24 h-6' />
              <Skeleton className='w-32 h-6 text-mythemes-maingreen' />
            </div>
            <Skeleton className='w-40 h-4' />
          </div>
          <div className='flex flex-col text-gray-700'>
            <div className='flex justify-between'>
              <Skeleton className='w-16 h-4' />
              <Skeleton className='w-32 h-4' />
            </div>
            <div className='flex justify-between'>
              <Skeleton className='w-16 h-4' />
              <Skeleton className='w-32 h-4' />
            </div>
          </div>
          <Separator />
          <div>
            <div className='flex flex-col gap-2'>
              <div>
                <div className='flex justify-between text-gray-500'>
                  <Skeleton className='w-32 h-4' />
                </div>
                <div className='flex flex-col pl-5 text-left'>
                  <Skeleton className='w-40 h-4' />
                  <Skeleton className='w-32 h-4' />
                  <Skeleton className='w-48 h-4' />
                </div>
              </div>
              <div>
                <div className='flex justify-between text-gray-500'>
                  <Skeleton className='w-32 h-4' />
                </div>
                <div className='flex flex-col pl-5 text-left'>
                  <Skeleton className='w-40 h-4' />
                  <Skeleton className='w-32 h-4' />
                  <Skeleton className='w-48 h-4' />
                </div>
              </div>
              <div className='flex justify-between'>
                <Skeleton className='w-32 h-4' />
                <Skeleton className='w-16 h-4' />
              </div>
            </div>
          </div>
          <Separator />
          <div className='flex flex-col'>
            <div className='flex justify-start gap-2'>
              <Skeleton className='w-24 h-4' />
              <Skeleton className='w-32 h-4' />
            </div>
            <div className='flex flex-col'>
              <Skeleton className='w-16 h-4' />
              <div className='flex text-sm h-10 font-bold bg-mythemes-grey rounded'>
                <Skeleton className='w-full h-full' />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Skeleton className='w-full h-10' />
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetails;

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const SkeletonCard = () => {
  return (
    <div className='relative flex overflow-hidden shadow-md bg-white py-3 px-5 rounded-xl'>
      <div>
        <Skeleton className='w-40 h-6 mb-2' />
        <div className='flex gap-2'>
          <div className='my-auto'>
            <Skeleton className='w-24 h-6 mb-1' />
            <Skeleton className='w-32 h-4' />
          </div>
        </div>
      </div>
      <div className='absolute top-0 left-0 h-full w-2 bg-gray-300'></div>
      <Skeleton className='absolute right-3 top-3 w-16 h-6' />
      <Skeleton className='absolute right-3 bottom-3 w-20 h-8' />
    </div>
  );
};

export default SkeletonCard;

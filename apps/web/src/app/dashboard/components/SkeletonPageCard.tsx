import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import SkeletonCard from './SkeletonCard';

const SkeletonPageCard = () => {
  return (
    <div className='min-h-dvh flex flex-col gap-2 pt-4 bg-mythemes-grey container px-6'>
      <div className='flex flex-col gap-3'>
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
        <div className='flex justify-center bg-mythemes-secondarygreen content-center rounded-xl mb-2'>  
          <Skeleton className='w-40 h-10' />
        </div>
      </div>
    </div>
  );
};

export default SkeletonPageCard;

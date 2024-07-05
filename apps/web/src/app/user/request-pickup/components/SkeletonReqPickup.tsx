import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import UserAddressList from './UserAddressList';

const SkeletonReqPickup = () => {
  return (
    <main className="relative container p-0 pt-[32px]">
      <div className="flex flex-col gap-3 mt-10">
        <Skeleton className="h-5 w-40 bg-slate-200" />
        <Skeleton className="px-6 bg-slate-200 text-white mb-5 rounded-xl py-6 flex flex-col gap-4 h-20" />
        <Skeleton className="h-5 w-40 bg-slate-200" />
        <Skeleton className="px-6 bg-slate-200 text-white rounded-xl py-6 flex flex-col gap-4 h-20" />
        <Skeleton className="px-6 bg-slate-200 text-white rounded-xl py-6 flex flex-col gap-4 h-20" />
        <Skeleton className="px-6 bg-slate-200 text-white rounded-xl py-6 flex flex-col gap-4 h-20" />
      </div>
    </main>
  );
};

export default SkeletonReqPickup;

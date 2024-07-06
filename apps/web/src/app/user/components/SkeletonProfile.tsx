import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const SkeletonProfile = () => {
  return (
    <section className="p-0 container relative mx-auto flex flex-col gap-5 mb-5  ">
      <Skeleton className="px-6 bg-slate-200 text-white rounded-xl py-6 flex flex-col gap-4 h-28 mt-24"></Skeleton>
      <div className='flex flex-col gap-2'>

      <Skeleton className="px-6 bg-slate-200 text-white rounded-xl py-6 flex flex-col h-10"></Skeleton>
      <Skeleton className="px-6 bg-slate-200 text-white rounded-xl py-6 flex flex-col h-10"></Skeleton>
      <Skeleton className="px-6 bg-slate-200 text-white rounded-xl py-6 flex flex-col h-10"></Skeleton>
      <Skeleton className="px-6 bg-slate-200 text-white rounded-xl py-6 flex flex-col h-10"></Skeleton>
      </div>

      {/* CARD PROMOTION - USE CAROUSEL */}

      {/* BROWSE OUTLET */}
      <Skeleton />
    </section>
  );
};

export default SkeletonProfile;

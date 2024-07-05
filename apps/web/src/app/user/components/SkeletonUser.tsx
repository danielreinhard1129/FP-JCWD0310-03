import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const SkeletonUser = () => {
  return (
    <section className="p-0 container relative mx-auto flex flex-col gap-8 mb-5  ">
      <Skeleton className="px-6 bg-slate-200 text-white rounded-b-3xl py-6 flex flex-col gap-4 h-28"></Skeleton>
      <Skeleton className="px-6 bg-slate-200 text-white rounded-xl py-6 flex flex-col gap-4 h-28"></Skeleton>
      <Skeleton className="px-6 bg-slate-200 text-white rounded-xl py-6 flex flex-col gap-4 h-28"></Skeleton>
      {/* CARD PROMOTION - USE CAROUSEL */}
   

      {/* BROWSE OUTLET */}
      <Skeleton />
    </section>
  );
};

export default SkeletonUser;

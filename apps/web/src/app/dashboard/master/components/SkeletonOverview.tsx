
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const SkeletonOverview = () => {
  return (
    <div className="container flex flex-col gap-5 p-6 bg-[#f4f4f4]">
      <div className="flex justify-between">
        <div>
          <Skeleton className="w-40 h-6" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="min-w-40 h-10" />
          <Skeleton className="min-w-40 h-10" />
          <Skeleton className="min-w-40 h-10" />
        </div>
      </div>
      <div className="flex gap-5">
        <Skeleton className="p-6 w-1/3 h-32 bg-white rounded-3xl" />
        <Skeleton className="p-6 w-1/3 h-32 bg-white rounded-3xl" />
        <Skeleton className="p-6 w-1/3 h-32 bg-white rounded-3xl" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="w-1/2 p-6 h-64 bg-white rounded-3xl" />
        <Skeleton className="w-1/2 p-6 h-64 bg-white rounded-3xl" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="w-1/2 p-6 h-64 bg-white rounded-3xl" />
        <Skeleton className="w-1/2 p-6 h-64 bg-white rounded-3xl" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="w-1/2 p-6 h-64 bg-white rounded-3xl" />
        <Skeleton className="w-1/2 p-6 h-64 bg-white rounded-3xl" />
      </div>
      <div className="rounded-sm flex shadow-md"></div>
      <div className="flex justify-between my-auto">
        <div>
          <Skeleton className="w-40 h-6" />
        </div>
      </div>
      <div>
        <Skeleton className="w-full h-8 mb-2" />
        <Skeleton className="w-full h-8 mb-2" />
        <Skeleton className="w-full h-8 mb-2" />
        <Skeleton className="w-full h-8 mb-2" />
        <Skeleton className="w-full h-8 mb-2" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="w-32 h-10" />
      </div>
    </div>
  );
};

export default SkeletonOverview;
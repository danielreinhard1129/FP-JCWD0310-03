import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const SkeletonTransactionPage = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 container p-4 bg-white px-6">
        <div className="relative flex gap-2">
          <Skeleton className="absolute h-6 w-6 my-auto" />
          <Skeleton className="h-6 w-40 mx-auto my-auto" />
        </div>
      </div>
      <div className="flex flex-col gap-4 container bg-mythemes-grey px-6 min-h-screen py-6">
        <div className="flex flex-col gap-4 p-6 rounded-xl shadow-lg bg-white">
          <Skeleton className="mx-auto h-10 w-10" />
          <div className="flex flex-col">
            <Skeleton className="mx-auto h-6 w-24" />
            <Skeleton className="mx-auto h-4 w-32" />
            <Skeleton className="mx-auto h-4 w-40" />
          </div>
          <div className="flex flex-col text-gray-700">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-1 w-full" />
          <div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="pl-4 flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
          <Skeleton className="h-1 w-full" />
          <div className="flex flex-col">
            <div className="flex">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex flex-col">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full rounded" />
            </div>
          </div>
        </div>
        <Skeleton className="h-10 w-32 mt-4 self-center" />
      </div>
    </div>
  );
};

export default SkeletonTransactionPage;

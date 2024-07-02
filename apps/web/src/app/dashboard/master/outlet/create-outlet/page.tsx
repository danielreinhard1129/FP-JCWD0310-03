'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import FormCreateOutlet from './components/FormCreateOutlet';
import { Separator } from '@/components/ui/separator';
import SuperAdminGuard from '@/hoc/SuperAdminGuard';
import { useRouter } from 'next/navigation';

const CreateOutlet = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className="p-6 flex gap-2 my-auto ">
        <ChevronLeft className="my-auto" onClick={() => router.back()} />
        <h1 className="text-lg font-bold my-auto">Add New Outlet</h1>
      </div>
      <Separator className="bg-black" />
      <div className="p-6 rounded-xl bg-white">
        <FormCreateOutlet />
      </div>
    </div>
  );
};

export default SuperAdminGuard(CreateOutlet);

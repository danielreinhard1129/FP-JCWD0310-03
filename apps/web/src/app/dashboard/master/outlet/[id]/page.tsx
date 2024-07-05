'use client';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import useUpdateOutlet from '@/hooks/api/outlet/useUpdateOutlet';
import useGetOutlet from '@/hooks/api/outlet/useGetOutlet';
import { OutletType } from '@/types/outlet.type';
import { getChangedValues } from '@/utils/getChangeValues';
import FormEditOutlet from './components/FormEditOutlet';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import logo1 from '../../../../../../public/Black Friday Typography Instagram Post.png'

interface UpdateOutletArgs {
  outletName: string;
  outletType: string;
  addressLine: string;
  city: string;
}

const EditOutlet = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const { updateOutlet, isLoading } = useUpdateOutlet(Number(params.id));
  const {
    outlet,
    isLoading: isLoadingGetOutlet,
    refetch,
  } = useGetOutlet(Number(params.id));

  const initialValues = {
    outletName: outlet?.outletName || '',
    outletType: outlet?.outletType || '',
    addressLine: outlet?.address[0].addressLine || '',
    city: outlet?.address[0].city || '',
    latitude: outlet?.address[0].latitude || '',
    longitude: outlet?.address[0].longitude || '',
  };

  if (isLoadingGetOutlet) {
    return (
      <div className=" container flex h-screen justify-center px-4 pt-24 text-4xl font-semibold">
        {/* Loading */}

      <div className="animate-pulse">
      <Image alt="logo" src={logo1} />
    </div>
      </div>
    );
  }

  const onSubmit = async (values: Partial<UpdateOutletArgs>) => {
    const payload = getChangedValues(values, initialValues);
    await updateOutlet(payload);
    refetch();
  };

  return (
    <div className="flex flex-col">
      <div className="p-6 flex gap-2 my-auto ">
        <ChevronLeft className="my-auto" onClick={() => router.back()} />
        <h1 className="text-lg font-bold my-auto">Outlet Detail</h1>
      </div>
      <Separator className="bg-black" />
      <div className="p-6 rounded-xl bg-white">
        <FormEditOutlet
          initialValues={initialValues}
          isLoading={isLoading}
          onSubmit={onSubmit}
          id={params.id}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default EditOutlet;

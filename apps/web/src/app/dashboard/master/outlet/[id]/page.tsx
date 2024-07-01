'use client';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import useUpdateOutlet from '@/hooks/api/outlet/useUpdateOutlet';
import useGetOutlet from '@/hooks/api/outlet/useGetOutlet';
import { OutletType } from '@/types/outlet.type';
import { getChangedValues } from '@/utils/getChangeValues';
import FormEditOutlet from './components/FormEditOutlet';

interface UpdateOutletArgs {
  outletName: string;
  outletType: string;
  addressLine: string;
  city: string;
}

const EditOutlet = ({ params }: { params: { id: number } }) => {
  const { updateOutlet, isLoading } = useUpdateOutlet(Number(params.id));
  const { outlet, isLoading: isLoadingGetOutlet } = useGetOutlet(
    Number(params.id),
  );

  const initialValues = {
    outletName: outlet?.outletName || '',
    outletType: outlet?.outletType || '',
    addressLine: outlet?.address[0].addressLine || '',
    city: outlet?.address[0].city || '',
  };

  if (isLoadingGetOutlet) {
    return (
      <div className=" container flex h-screen justify-center px-4 pt-24 text-4xl font-semibold">
        Loading
      </div>
    );
  }

  const onSubmit = (values: Partial<UpdateOutletArgs>) => {
    const payload = getChangedValues(values, initialValues);
    updateOutlet(payload);
  };

  return (
    <div className="flex flex-col">
      <div className="p-6 flex gap-2 my-auto ">
        <Link className="my-auto" href={'/dashboard/master/employee'}>
          <ChevronLeft />
        </Link>
        <h1 className="text-lg font-bold my-auto">Add New Outlet</h1>
      </div>
      <div className="mx-8 mb-8 p-5 w-8/12 rounded-xl bg-mythemes-secondarygreen">
        <FormEditOutlet
          initialValues={initialValues}
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default EditOutlet;

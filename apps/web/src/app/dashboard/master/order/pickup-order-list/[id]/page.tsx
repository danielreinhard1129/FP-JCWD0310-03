'use client'
import { ChevronLeft, Weight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import FormCreateOrder from './components/FormCreateOrder';
import { ValidationSchema } from './validationSchema';
import { z } from 'zod';
import useGetPickupOrder from '@/hooks/api/pickupOrder/useGetPickupOrder';
import useCreateOrder from '@/hooks/api/order/useCreateOrder';

const CreateOrder = ({ params }: { params: { id: string } }) => {
const { pickupOrder, isLoading: isLoadingGetPickupOrder } = useGetPickupOrder(Number(params.id));
const { createOrder } = useCreateOrder();

const initialValues = {
  pickupNumber: pickupOrder?.pickupNumber || '',
};

if (isLoadingGetPickupOrder) {
  return (
    <div className=' container flex h-screen justify-center px-4 pt-24 text-4xl font-semibold'>
      Loading
    </div>
  )
}

const onSubmit = (values: any) => {
  createOrder(values);

};
  return (
    <div className="flex flex-col">
      <div className="p-6 flex gap-2 my-auto ">
        <Link className="my-auto" href={"/dashboard-super-admin/menu-order/pickup-order-list"}>
          <ChevronLeft />
        </Link>
        <h1 className="text-lg font-bold my-auto">Create Order</h1>
      </div>
      <div className="mx-8 mb-8 p-5 w-8/12 rounded-xl bg-mythemes-secondarygreen">
        <FormCreateOrder
        initialValues={initialValues}
        isLoading={isLoadingGetPickupOrder}
        onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}

export default CreateOrder
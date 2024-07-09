'use client';
import useCreateOrder from '@/hooks/api/order/useCreateOrder';
import useGetPickupOrder from '@/hooks/api/pickupOrder/useGetPickupOrder';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import FormCreateOrder from './components/FormCreateOrder';
import AdminAuthGuard from '@/hoc/AdminAuthGuard';
import Image from 'next/image';
import logo1 from '../../../../../../../public/Black Friday Typography Instagram Post.png';
import { Separator } from '@/components/ui/separator';

const CreateOrder = ({ params }: { params: { id: string } }) => {
  const { pickupOrder, isLoading: isLoadingGetPickupOrder } = useGetPickupOrder(
    Number(params.id),
  );
  const { createOrder, isLoading } = useCreateOrder();

  const initialValues = {
    pickupNumber: pickupOrder?.pickupNumber || '',
    weight: '',
    orderItem: [{ laundryItemId: "", qty: "" }]
   
  };

  if (isLoadingGetPickupOrder) {
    return (
      <div className=" container flex h-screen justify-center px-4 pt-24 text-4xl font-semibold">
        {/* Loading */}
        <div className="animate-pulse">
          <Image alt="logo" src={logo1} />
        </div>
      </div>
    );
  }

  const onSubmit = (values: any) => {       
    createOrder(values);
  };
  return (
    <div className="flex flex-col">
      <div className="p-6 flex gap-2 my-auto ">
        <Link
          className="my-auto"
          href={'/dashboard/master/order/pickup-order-list'}
        >
          <ChevronLeft />
        </Link>
        <h1 className="text-lg font-bold my-auto">Create Order</h1>
      </div>
      <Separator className="bg-black" />
      <div className="p-6 rounded-xl bg-white w-1/2">
        <FormCreateOrder
          initialValues={initialValues}
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default AdminAuthGuard(CreateOrder);

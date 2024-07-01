'use client'
import useGetOrder from '@/hooks/api/order/useGetOrder';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const OrderDetail = ({ params }: { params: { id: string } }) => {
  const { data, refetch, isLoading } = useGetOrder(Number(params.id));
  return (
    <div>
      <div className='flex flex-col gap-4 container p-4 bg-white px-6'>
        <div className='relative flex gap-2'>
          <Link className='absolute h-6 my-auto' href={"/user/order"}>
            <ChevronLeft className='h-6 my-auto' />
          </Link>
          <h1 className='font-bold mx-auto my-auto'>Order Details</h1>
        </div>
      </div>
      <div className='flex flex-col gap-4 container bg-mythemes-grey px-6 min-h-screen py-6'>
        <div className='flex flex-col gap-2 p-6 rounded-xl shadow-lg bg-white'>
          <div className='mx-auto font-bold '>{data?.orderNumber}</div>
          <div className='flex'>
            <p className='text-sm w-5/12 font-semibold'>Order Status</p>
            <p className='text-sm w-7/12 '>: {data?.orderStatus}</p>
          </div>
        </div>
        <Link href={`/user/order/${params.id}/transaction`}>
        <button className='bg-mythemes-maingreen text-white p-1 rounded-xl'>Pay</button>
        </Link>

      </div>
    </div>
  )
}

export default OrderDetail
"use client"

import Pagination from '@/components/Pagination';
import useGetOrders from '@/hooks/api/order/useGetOrders';
import useGetPickupOrders from '@/hooks/api/pickupOrder/useGetPickupOrders';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import OrderCard from './components/OrderCard';
import { useAppSelector } from '@/redux/hooks';
import { MIDTRANS_PUBLIC_CLIENT } from '@/utils/config';


const UserOrder = () => {
  const [page, setPage] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user);

  const { data: orders, meta, refetch } = useGetOrders({
    id: id,
    page,
    take: 10,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  useEffect(()=>{
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey = MIDTRANS_PUBLIC_CLIENT

    const script = document.createElement('script')
    script.src = snapScript
    script.setAttribute('data-client-key', clientKey || '')
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])
  return (
    <div>
      <div className='flex flex-col gap-3 container bg-white px-6'>
        <div className='relative flex gap-2 my-4'>
          <Link className='absolute h-6 my-auto' href={"/dashboard/driver"}>
            <ChevronLeft className='h-6 my-auto' />
          </Link>
          <h1 className='font-bold mx-auto my-auto'>Your Order</h1>
        </div>
      </div>
      <div className='min-h-dvh flex flex-col gap-2 pt-4 bg-mythemes-grey container px-6'>
      <div className='flex flex-col gap-3'>
        {orders.map((order, index) => {
          return (
            <OrderCard
              key={index}
              orderId={order.id}
              orderNumber={order.orderNumber}
              orderStatus={order.orderStatus}
              createAt={String(order.createdAt)}
              refetch={refetch}              
            />
          )
        })}
        <div className='flex justify-center bg-mythemes-secondarygreen content-center rounded-xl mb-2'>  
            <Pagination
              total={meta?.total || 0}
              take={meta?.take || 0}
              onChangePage={handleChangePaginate}
            />
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserOrder
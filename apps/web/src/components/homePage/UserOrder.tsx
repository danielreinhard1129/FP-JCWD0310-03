'use client';
import OrderCard from '@/app/user/order/components/OrderCard';
import useGetOrders from '@/hooks/api/order/useGetOrders';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import noAct from '../../../public/No activity yet.png';
import { Separator } from '../ui/separator';
import Image from 'next/image';

const UserOrder = () => {
  const [page, setPage] = useState(1);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);

  const dateNow = new Date();

  const {
    data: orders,
    meta,
    refetch,
  } = useGetOrders({
    page,
    take: 10,
    filterDate: date,
  });
  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3 px-6">
        <p className=" ">Your Order</p>
        <Separator />
        {orders.length == 0 ? (
          <div className=" flex flex-col place-content-center container gap-2 mt-40">
            <Image
              alt="logo"
              src={noAct}
              className="object-contain opacity-50"
              draggable="false"
            />
            <h1 className="text-center text-2xl font-bold text-gray-400">
              No Activity yet ...
            </h1>
          </div>
        ) : (
          orders.map((order, index) => {
            const formattedDate = format(
              new Date(order.createdAt),
              'dd-MM-yyyy',
            );
            return (
              <OrderCard
                key={index}
                orderId={order.id}
                orderNumber={order.orderNumber}
                orderStatus={order.orderStatus}
                isPaid={order.isPaid}
                createAt={formattedDate}
                refetch={refetch}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default UserOrder;

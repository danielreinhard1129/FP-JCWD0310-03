'use client';
import useGetOutletList from '@/hooks/api/outlet/useGetOutletsList';
import { Card, CardContent } from '../ui/card';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { useState } from 'react';
import OrderCard from '@/app/user/order/components/OrderCard';
import useGetOrders from '@/hooks/api/order/useGetOrders';
import { format } from 'date-fns';

const UserOrder = () => {
  const [page, setPage] = useState(1);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(true);

  const dateNow = new Date();

  const {
    data: orders,
    meta,
    refetch,
  } = useGetOrders({
    page,
    take: 10,
    filterDate: dateNow,
  });

  return (
    <>
      <div className="flex flex-col gap-3">
        {orders.map((order, index) => {
          const formattedDate = format(new Date(order.createdAt), 'dd-MM-yyyy');
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
        })}
      </div>
    </>
  );
};

export default UserOrder;

'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useGetOrders from '@/hooks/api/order/useGetOrders';
import React, { useState } from 'react'
import ItemFilterOutlet from '../order/components/ItemFilterOutlet';
import Link from 'next/link';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TableOrder from '../order/components/TableOrder';
import Pagination from '@/components/Pagination';
import { OrderStatus } from '@/types/order.type';
import TableDeliveryRequest from './components/TableDeliveryRequest';

const DeliveryRequest = () => {
  const [page, setPage] = useState<number>(1);
  // const { id } = useAppSelector((state) => state.user);
  const id = 1
  const [filterOutlet, setFilterOutlet] = useState("all")
  const [sortOrder, setSortOrder] = useState('asc')

  const { data: orders, meta, refetch } = useGetOrders({
    id: id,
    page,
    take: 10,
    filterOutlet,
    filterStatus : String(OrderStatus.READY_TO_DELIVER),
    sortOrder,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const handleChangeFilterOutlet = (value: string) => {
    setFilterOutlet(value)
  }

  const handleChangeSortingBy = (value: 'asc' | 'desc') => {
    setSortOrder(value)
  }

  return (
    <div className='container flex flex-col gap-5 p-6'>
      <div className='flex justify-between'>
        <div>
          <h1 className='font-bold text-xl'>Your Orders</h1>
        </div>
        <div className='flex gap-2'>
          <Select name='outlet' onValueChange={handleChangeFilterOutlet} defaultValue='all'>
            <SelectTrigger className='min-w-40'>
              <SelectValue placeholder={"Outlet"} />
            </SelectTrigger>
            <ItemFilterOutlet />
          </Select>
          <Select name='sortOrder' onValueChange={handleChangeSortingBy} defaultValue='asc'>
            <SelectTrigger className='min-w-40'>
              <SelectValue placeholder={"Sort By"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='asc'>Sort by: Newest</SelectItem>
              <SelectItem value='desc'>Sort by: Latest</SelectItem>
            </SelectContent>
          </Select>
          <Link href={"/dashboard/master/order/pickup-order-list"}>
            <div className='flex bg-mythemes-maingreen h-full w-40 rounded-lg'>
              <h1 className='text-white font-medium mx-auto my-auto'>Create Order</h1>
            </div>
          </Link>
        </div>
      </div>
      <div>

        <Table className='text-xs bg-mythemes-secondarygreen/40 rounded-xl text-stone-800'>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Pickup Number</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead></TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order, index) => {
              return (
                <TableDeliveryRequest
                  key={index}
                  orderId={order.id}
                  orderNumber={order.orderNumber}
                  pickupNumber={order.pickupOrder.pickupNumber}
                  weight={String(order.weight)}
                  price={String(order.laundryPrice)}
                  createdAt={String(order.createdAt)}
                  status={order.orderStatus}
                  refetch={refetch}
                />
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        />
      </div>      
    </div>
  )
}

export default DeliveryRequest
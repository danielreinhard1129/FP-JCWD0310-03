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
import useGetUser from '@/hooks/api/user/useGetUser';

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

  const {user} = useGetUser(id);

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
      <div>
        <h1 className='font-bold text-xl'>Delivery Request</h1>
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
                  employeeWorkShift={user?.employee?.workShift}
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
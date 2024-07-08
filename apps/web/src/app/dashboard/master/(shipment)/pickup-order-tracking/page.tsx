'use client'
import Pagination from '@/components/Pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminAuthGuard from '@/hoc/AdminAuthGuard';
import useGetDeliveryOrders from '@/hooks/api/deliveryOrder/useGetDeliveryOrders';
import useGetPickupOrders from '@/hooks/api/pickupOrder/useGetPickupOrders';
import { useAppSelector } from '@/redux/hooks';
import { OrderStatus } from '@/types/order.type';
import { PickupStatus } from '@/types/pickupOrder.type';
import React, { useState } from 'react'

const Shipment = () => {
  const [page, setPage] = useState<number>(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const { data: pickupOrders, meta, refetch } = useGetPickupOrders({
    page,
    take: 10,
    pickupStatus: filterStatus,
    sortOrder,
    isClaimedbyDriver: Number(Boolean(true))
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };
  const handleChangeFilterStatus = (value: string) => {
    setFilterStatus(value);
  };
  const handleChangeSortingBy = (value: 'asc' | 'desc') => {
    setSortOrder(value);
  };

  return (
    <div className='container flex flex-col gap-5 pt-6 px-6'>
      <div className='flex justify-between my-auto'>
        <div>
          <h1 className="font-bold text-xl">Pickup Order Tracking</h1>
        </div>
        <div className='flex gap-2'>
          <Select
            name="status"
            onValueChange={handleChangeFilterStatus}
            defaultValue="all"
          >
            <SelectTrigger className="min-w-40">
              <SelectValue placeholder={'Status'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value={PickupStatus.ON_THE_WAY_TO_CUSTOMER}>On the way to customer</SelectItem>
              <SelectItem value={PickupStatus.ON_THE_WAY_TO_OUTLET}>On the way to outlet</SelectItem>
              <SelectItem value={PickupStatus.RECEIVED_BY_OUTLET}>Done</SelectItem>
            </SelectContent>
          </Select>
          <Select
            name="sortOrder"
            onValueChange={handleChangeSortingBy}
            defaultValue="asc"
          >
            <SelectTrigger className="min-w-40">
              <SelectValue placeholder={'Sort By'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Sort by: Oldest</SelectItem>
              <SelectItem value="desc">Sort by: Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver Name</TableHead>
              <TableHead>Pickup Number</TableHead>
              <TableHead>Outlet</TableHead>
              <TableHead>Position</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pickupOrders?.map((item, index) => {
              return (
                <TableRow key={index} >
                  <TableCell>{item.driver?.user.fullName}</TableCell>
                  <TableCell>{item.pickupNumber}</TableCell>
                  <TableCell>{item.outlet.outletName}</TableCell>
                  <TableCell>{item.pickupStatus}</TableCell>
                </TableRow>
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

export default AdminAuthGuard(Shipment)
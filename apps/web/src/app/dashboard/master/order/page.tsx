'use client';
import Pagination from '@/components/Pagination';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useGetOrders from '@/hooks/api/order/useGetOrders';
import Link from 'next/link';
import { useState } from 'react';
import TableOrder from './components/TableOrder';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ItemFilterOutlet from './components/ItemFilterOutlet';
import ItemFilterStatus from './components/ItemFilterStatus';
import { useAppSelector } from '@/redux/hooks';
import AdminAuthGuard from '@/hoc/AdminAuthGuard';
import { Role } from '@/types/user.type';

const MenuOrder = () => {
  const [page, setPage] = useState<number>(1);
  const { role } = useAppSelector((state) => state.user);
  const [filterOutlet, setFilterOutlet] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  const {
    data: orders,
    meta,
    refetch,
  } = useGetOrders({
    page,
    take: 10,
    filterOutlet,
    filterStatus,
    sortOrder,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const handleChangeFilterOutlet = (value: string) => {
    setFilterOutlet(value);
  };
  const handleChangeFilterStatus = (value: string) => {
    setFilterStatus(value);
  };
  const handleChangeSortingBy = (value: 'asc' | 'desc') => {
    setSortOrder(value);
  };

  return (
    <div className="container flex flex-col gap-5 p-6">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-xl">Your Orders</h1>
        </div>
        <div className="flex gap-2">
          <div className={`${role !== Role.SUPER_ADMIN ? 'hidden' : 'block'}`}>
            <Select
              name="outlet"
              onValueChange={handleChangeFilterOutlet}
              defaultValue="all"
            >
              <SelectTrigger className="min-w-40">
                <SelectValue placeholder={'Outlet'} />
              </SelectTrigger>
              <ItemFilterOutlet />
            </Select>
          </div>
          <Select
            name="status"
            onValueChange={handleChangeFilterStatus}
            defaultValue="all"
          >
            <SelectTrigger className="min-w-40">
              <SelectValue placeholder={'Status'} />
            </SelectTrigger>
            <ItemFilterStatus />
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
              <SelectItem value="asc">Sort by: Newest</SelectItem>
              <SelectItem value="desc">Sort by: Latest</SelectItem>
            </SelectContent>
          </Select>
          <Link href={'/dashboard/master/order/pickup-order-list'}>
            <div className="flex bg-mythemes-maingreen h-full w-40 rounded-lg">
              <h1 className="text-white font-medium mx-auto my-auto">
                Create Order
              </h1>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <Table className=" rounded-xl text-stone-800">
          <TableHeader>
            <TableRow>
              <TableHead className="text-black font-bold">
                Order Number
              </TableHead>
              <TableHead className="text-black font-bold">
                Pickup Number
              </TableHead>
              <TableHead className="text-black font-bold">Weight</TableHead>
              <TableHead className="text-black font-bold">Price</TableHead>
              <TableHead className="text-black font-bold">
                Created Date
              </TableHead>
              <TableHead className="text-black font-bold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order, index) => {
              return (
                <TableOrder
                  key={index}
                  orderId={order.id}
                  orderNumber={order.orderNumber}
                  pickupNumber={order.pickupOrder.pickupNumber}
                  weight={String(order.weight)}
                  price={String(order.laundryPrice)}
                  createdAt={String(order.createdAt)}
                  status={order.orderStatus}
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
  );
};

export default AdminAuthGuard(MenuOrder);

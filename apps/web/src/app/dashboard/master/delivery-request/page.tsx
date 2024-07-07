'use client';
import Pagination from '@/components/Pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AdminAuthGuard from '@/hoc/AdminAuthGuard';
import useGetOrders from '@/hooks/api/order/useGetOrders';
import { useAppSelector } from '@/redux/hooks';
import { OrderStatus } from '@/types/order.type';
import { Role } from '@/types/user.type';
import { useState } from 'react';
import ItemFilterOutlet from '../order/components/ItemFilterOutlet';
import TableDeliveryRequest from './components/TableDeliveryRequest';

const DeliveryRequest = () => {
  const [page, setPage] = useState<number>(1);
  const [filterOutlet, setFilterOutlet] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');  
  const { role } = useAppSelector((state) => state.user);

  const {
    data: orders,
    meta,
    refetch,
  } = useGetOrders({
    page,
    take: 10,
    filterOutlet,
    filterStatus: String(OrderStatus.READY_FOR_DELIVERY),
    sortOrder,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const handleChangeFilterOutlet = (value: string) => {
    setFilterOutlet(value);
  };

  const handleChangeSortingBy = (value: 'asc' | 'desc') => {
    setSortOrder(value);
  };

  return (
    <div className="container flex flex-col gap-5 p-6">
      <div className='flex justify-between'>
      <div>
        <h1 className="font-bold text-xl">Delivery Request</h1>
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
        </div>
      </div>
      <div>
        <Table className="rounded-xl ">
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
              const options:Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
              return (
                <TableDeliveryRequest
                  key={index}
                  orderId={order.id}
                  orderNumber={order.orderNumber}
                  pickupNumber={order.pickupOrder.pickupNumber}
                  weight={String(order.weight)}
                  price={String(order.laundryPrice)}
                  createdAt={String(
                    new Date(order.createdAt).toLocaleDateString('en-US',options),
                  )}
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
  );
};

export default AdminAuthGuard(DeliveryRequest);

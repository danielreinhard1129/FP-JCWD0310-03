'use client';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useGetUser from '@/hooks/api/user/useGetUser';
import React, { useState } from 'react';
import TableBypassRequest from './components/TableBypaassRequest';
import Pagination from '@/components/Pagination';
import useGetOrderWorkers from '@/hooks/api/orderWorker/useGetOrderWorkers';
import AdminAuthGuard from '@/hoc/AdminAuthGuard';
import { useAppSelector } from '@/redux/hooks';
import { Role } from '@/types/user.type';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ItemFilterOutlet from '../order/components/ItemFilterOutlet';

const BypassRequest = () => {
  const [pageBypass, setPageBypass] = useState<number>(1);
  const [filterOutlet, setFilterOutlet] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const { role } = useAppSelector((state) => state.user);
  const {
    data: orderWorkers,
    meta: metaBypass,
    refetch: refetchBypass,
  } = useGetOrderWorkers({
    page: pageBypass,
    take: 8,
    sortOrder,
    filterOutlet,
    bypassRequest: Number(Boolean(true)),
  });

  const handleChangePaginateBypass = ({ selected }: { selected: number }) => {
    setPageBypass(selected + 1);
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
          <h1 className="font-bold text-xl">Bypass Request</h1>
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
              <SelectItem value="asc">Sort by: Oldest</SelectItem>
              <SelectItem value="desc">Sort by: Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Table className=" rounded-xl">
          <TableHeader>
            <TableRow>
              <TableHead className="text-black font-bold">
                Order Number
              </TableHead>
              <TableHead className="text-black font-bold">Weight</TableHead>
              <TableHead className="text-black font-bold">Price</TableHead>
              <TableHead className="text-black font-bold">Outlet</TableHead>
              <TableHead className="text-black font-bold">Station</TableHead>
              <TableHead className="text-black font-bold">Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderWorkers?.map((orderWorker, index) => {
              return (
                <TableBypassRequest
                  key={index}
                  orderWorkerId={orderWorker.id}
                  isAccept={orderWorker.bypassAccepted}
                  isReject={orderWorker.bypassRejected}
                  orderNumber={orderWorker.order.orderNumber}
                  weight={String(orderWorker.order.weight)}
                  price={String(orderWorker.order.laundryPrice)}
                  outlet={String(
                    orderWorker.order.pickupOrder.outlet.outletName,
                  )}
                  station={String(orderWorker.station)}
                  note={String(orderWorker.bypassNote)}
                  refetch={refetchBypass}
                />
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          total={metaBypass?.total || 0}
          take={metaBypass?.take || 0}
          onChangePage={handleChangePaginateBypass}
        />
      </div>
    </div>
  );
};

export default AdminAuthGuard(BypassRequest);

'use client'
import Pagination from '@/components/Pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminAuthGuard from '@/hoc/AdminAuthGuard';
import useGetDeliveryOrders from '@/hooks/api/deliveryOrder/useGetDeliveryOrders';
import { DeliveryStatus } from '@/types/deliveryOrder.type';
import { useState } from 'react';

const Shipment = () => {
  const [pageDelivery, setPageDelivery] = useState<number>(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  const { data: deliveryOrders, meta: metaDelivery, refetch: refetchDelivery } = useGetDeliveryOrders({
    page: pageDelivery,
    take: 10,
    deliveryStatus: filterStatus,
    sortOrder,
    isClaimedbyDriver: Number(Boolean(true))
  });

  const handleChangePaginateDelivery = ({ selected }: { selected: number }) => {
    setPageDelivery(selected + 1);
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
          <h1 className="font-bold text-xl">Delivery Order Tracking</h1>
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
              <SelectItem value={DeliveryStatus.ON_THE_WAY_TO_CUSTOMER}>On the way to customer</SelectItem>
              <SelectItem value={DeliveryStatus.ON_THE_WAY_TO_OUTLET}>On the way to outlet</SelectItem>
              <SelectItem value={DeliveryStatus.RECEIVED_BY_CUSTOMER}>Done</SelectItem>
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
              <TableHead>Delivery Number</TableHead>
              <TableHead>Outlet</TableHead>
              <TableHead>Position</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveryOrders?.map((item, index) => {
              return (
                <TableRow key={index} >
                  <TableCell>{item.driver?.user.fullName}</TableCell>
                  <TableCell>{item.deliveryNumber}</TableCell>
                  <TableCell>{item.order.pickupOrder.outlet.outletName}</TableCell>
                  <TableCell>{item.deliveryStatus}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          total={metaDelivery?.total || 0}
          take={metaDelivery?.take || 0}
          onChangePage={handleChangePaginateDelivery}
        />
      </div>
    </div>
  )
}

export default AdminAuthGuard(Shipment)
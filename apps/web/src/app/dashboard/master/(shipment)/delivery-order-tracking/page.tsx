'use client'
import Pagination from '@/components/Pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminAuthGuard from '@/hoc/AdminAuthGuard';
import useGetDeliveryOrders from '@/hooks/api/deliveryOrder/useGetDeliveryOrders';
import { useState } from 'react';

const Shipment = () => {
  const [pageDelivery, setPageDelivery] = useState<number>(1);  
  
  const { data: deliveryOrders, meta: metaDelivery, refetch: refetchDelivery } = useGetDeliveryOrders({
    page: pageDelivery,
    take: 10,
    isClaimedbyDriver: Number(Boolean(true))
  });

  const handleChangePaginateDelivery = ({ selected }: { selected: number }) => {
    setPageDelivery(selected + 1);
  };

  return (
    <div className='container flex flex-col gap-5 pt-6 px-6'>
      <div className='flex justify-between my-auto'>
        <div>
          <h1 className="font-bold text-xl">Delivery Order Tracking</h1>
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
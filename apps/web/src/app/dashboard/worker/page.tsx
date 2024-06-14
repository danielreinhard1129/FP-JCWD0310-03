'use client'
import Pagination from '@/components/Pagination';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useGetOnPendingOrders from '@/hooks/api/order/useGetOnPendingOrders';
import { useState } from 'react';
import TablePickupRequest from '../driver/components/TablePickupRequest';


const DashboardWorker = () => {
  const [pageOnPending, setPageOnPending] = useState<number>(1);
  // const { id } = useAppSelector((state) => state.user);
  const id = 3;
  const { data: onPendingOrders, meta: metaOnPendingOrders, refetch: refetchOnPendingOrders } = useGetOnPendingOrders({
    id: id,
    page: pageOnPending,
    take: 10,
  });
  
  const handleChangePaginatePendingOrders = ({ selected }: { selected: number }) => {
    setPageOnPending(selected + 1);
  };

  return (
    <div className='flex flex-col gap-5 p-6'>
      <div className='flex justify-between my-auto'>
        <div>
          <h1 className='font-bold text-xl'>Request</h1>
        </div>
      </div>
      
      <div>
        <Table className='text-xs bg-mythemes-secondarygreen rounded-xl'>
          <TableHeader>
            <TableRow>
              <TableHead>Ref. Number</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Outlet</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {onPendingOrders.map((onPendingOrder, index) => {
              return (
                <TablePickupRequest
                  key={index}
                  driverId={id}
                  pickupOrderId={onPendingOrder.id}
                  pickupNumber={onPendingOrder.orderNumber}
                  name={String(onPendingOrder.weight)}
                  address={String(onPendingOrder.laundryPrice)}
                  outlet={onPendingOrder.orderStatus}
                  refetch1={refetchOnPendingOrders}
                  refetch2={()=>{}}
                />
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          total={metaOnPendingOrders?.total || 0}
          take={metaOnPendingOrders?.take || 0}
          onChangePage={handleChangePaginatePendingOrders}
        />
      </div>
      <div className='flex justify-between my-auto'>
        <div>
          <h1 className='font-bold text-xl'>Ongoing</h1>
        </div>
      </div>
      <div className='flex justify-between my-auto'>
        <div>
          <h1 className='font-bold text-xl'>Completed</h1>
        </div>
      </div>
    </div>
  )
}

export default DashboardWorker
'use client'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useGetUser from '@/hooks/api/user/useGetUser';
import React, { useState } from 'react'
import TableBypassRequest from '../order/components/TableBypaassRequest';
import Pagination from '@/components/Pagination';
import useGetOrderWorkers from '@/hooks/api/orderWorker/useGetOrderWorkers';
import { useAppSelector } from '@/redux/hooks';

const BypassRequest = () => {
  const [pageBypass, setPageBypass] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user);
  const { data: orderWorkers, meta: metaBypass, refetch: refetchBypass } = useGetOrderWorkers({
    id: id,
    page: pageBypass,
    take: 10,
    bypassRequest: Number(Boolean(true)),
  });

  const {user} = useGetUser(id);

  const handleChangePaginateBypass = ({ selected }: { selected: number }) => {
    setPageBypass(selected + 1);
  };

  return (
    <div className='container flex flex-col gap-5 p-6'>      
      <div>
        <h1 className='font-bold text-xl'>Bypass Request</h1>
      </div>
      <div>
        <Table className='text-xs bg-mythemes-secondarygreen/40 rounded-xl text-stone-800'>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Outlet</TableHead>
              <TableHead>Station</TableHead>
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
                  outlet={String(orderWorker.order.pickupOrder.outlet.outletName)}
                  station={String(orderWorker.station)}
                  refetch={refetchBypass}
                  employeeWorkShift={user?.employee?.workShift}
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
  )
}

export default BypassRequest
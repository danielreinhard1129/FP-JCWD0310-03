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
import TableBypassRequest from '../order/components/TableBypaassRequest';
import Pagination from '@/components/Pagination';
import useGetOrderWorkers from '@/hooks/api/orderWorker/useGetOrderWorkers';
import AdminAuthGuard from '@/hoc/AdminAuthGuard';

const BypassRequest = () => {
  const [pageBypass, setPageBypass] = useState<number>(1);
  const {
    data: orderWorkers,
    meta: metaBypass,
    refetch: refetchBypass,
  } = useGetOrderWorkers({
    page: pageBypass,
    take: 10,
    bypassRequest: Number(Boolean(true)),
  });

  const { user } = useGetUser();

  const handleChangePaginateBypass = ({ selected }: { selected: number }) => {
    setPageBypass(selected + 1);
  };

  return (
    <div className="container flex flex-col gap-5 p-6">
      <div>
        <h1 className="font-bold text-xl">Bypass Request</h1>
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
  );
};

export default AdminAuthGuard(BypassRequest);

'use client';

import NoData from '@/app/dashboard/components/noData';
import Pagination from '@/components/Pagination';
import WorkerIronerAuthGuard from '@/hoc/WorkerIronerAuthGuard';
import useGetOrderWorkers from '@/hooks/api/orderWorker/useGetOrderWorkers';
import { useAppSelector } from '@/redux/hooks';
import { EmployeeStation } from '@/types/employee.type';
import { OrderStatus } from '@/types/order.type';
import { useState } from 'react';
import WashingCard from '../../components/WashingCard';

const IroningHistory = () => {
  const [page, setPage] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user);
  const {
    data: orderWorkers,
    meta,
    refetch,
  } = useGetOrderWorkers({
    page,
    take: 10,
    isComplete: Number(Boolean(true)),
    station: String(EmployeeStation.IRONING),
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className="min-h-dvh flex flex-col gap-2 pt-4 bg-mythemes-grey container px-6">
      <div className="flex flex-col gap-3">
        {orderWorkers.length == 0 ? (
          <NoData />
        ) : (
          <>
            {orderWorkers.map((orderWorker, index) => {
              return (
                <WashingCard
                  key={index}
                  workerId={id}
                  orderId={orderWorker.orderId}
                  targetStatus={OrderStatus.IRONING_COMPLETED}
                  referenceNumber={orderWorker.order.orderNumber}
                  fullName={orderWorker.order.pickupOrder.user.fullName}
                  email={orderWorker.order.pickupOrder.user.email}
                  refetch={refetch}
                  buttonLabel="Complete"
                  isHistory={true}
                  weight={orderWorker.order.weight}
                  isItemChecking={false}
                  isBypassRequest={false}
                  isBypassAccepted={false}
                  isBypassRejected={orderWorker.bypassRejected}
                />
              );
            })}

            <div className="flex justify-center bg-green-200 content-center rounded-xl mb-2">
              <Pagination
                total={meta?.total || 0}
                take={meta?.take || 0}
                onChangePage={handleChangePaginate}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkerIronerAuthGuard(IroningHistory);

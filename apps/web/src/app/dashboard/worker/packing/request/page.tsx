'use client'
import Pagination from '@/components/Pagination';
import useGetOrders from '@/hooks/api/order/useGetOrders';
import { OrderStatus } from '@/types/order.type';
import { useState } from 'react';
import WashingCard from '../../components/WashingCard';
import useGetUser from '@/hooks/api/user/useGetUser';
import WorkerAuthGuard from '@/hoc/WorkerAuthGuard';
import { useAppSelector } from '@/redux/hooks';
import NoData from '@/app/dashboard/components/noData';
import WorkerPackerAuthGuard from '@/hoc/WorkerPackerAuthGuard';


const PackingRequest = () => {
  const [page, setPage] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user);
  const { data: orders, meta, refetch } = useGetOrders({
    page,
    take: 10,
    filterStatus: String(OrderStatus.IRONING_COMPLETED)
  });

  const { user } = useGetUser();

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };


  return (
    <div className='min-h-dvh flex flex-col gap-2 pt-4 bg-mythemes-grey container px-6'>
      <div className='flex flex-col gap-3'>
        {orders.length == 0 ? (
          <NoData />
        ) : (
          <>
            {orders.map((order, index) => {
              return (
                <WashingCard
                  key={index}
                  workerId={id}
                  orderId={order.id}
                  targetStatus={OrderStatus.BEING_PACKED}
                  referenceNumber={order.orderNumber}
                  fullName={order.pickupOrder?.user?.fullName}
                  email={order.pickupOrder?.user?.email}
                  refetch={refetch}
                  buttonLabel="Claim"
                  isHistory={false}
                  weight={order.weight}
                  isItemChecking={true}
                  isBypassRequest={false}
                  isBypassAccepted={false}
                  isBypassRejected={false}
                  employeeWorkShift={user?.employee?.workShift}
                />
              )
            })}

            <div className='flex justify-center bg-mythemes-secondarygreen content-center rounded-xl mb-2'>
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
  )
}

export default WorkerPackerAuthGuard(PackingRequest)
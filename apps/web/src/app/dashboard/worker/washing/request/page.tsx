'use client'
import Pagination from '@/components/Pagination';
import useGetOrders from '@/hooks/api/order/useGetOrders';
import { OrderStatus } from '@/types/order.type';
import { useState } from 'react';
import WashingCard from '../../components/WashingCard';
import { useAppSelector } from '@/redux/hooks';
import useGetUser from '@/hooks/api/user/useGetUser';
import WorkerAuthGuard from '@/hoc/WorkerAuthGuard';


const WashingRequest = () => {
  const [page, setPage] = useState<number>(1);  
  const { id: id } = useAppSelector((state) => state.user);
  const { data: orders, meta, refetch } = useGetOrders({
    // id: id,
    page,
    take: 10,
    filterStatus: String(OrderStatus.READY_FOR_WASHING)
  });

  const {user} = useGetUser(); 

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };


  return (
    <div className='min-h-dvh flex flex-col gap-2 pt-4 bg-mythemes-grey container px-6'>
      <div className='flex flex-col gap-3'>
      {orders.map((order, index) => {
          return (
            <WashingCard
              key={index}
              workerId={id}
              orderId={order.id}
              targetStatus={OrderStatus.BEING_WASHED}
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
      </div>
    </div>
  )
}

export default WorkerAuthGuard(WashingRequest)
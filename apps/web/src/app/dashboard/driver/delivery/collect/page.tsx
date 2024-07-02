'use client'
import Pagination from '@/components/Pagination';
import useGetDeliveryOrders from '@/hooks/api/deliveryOrder/useGetDeliveryOrders';
import { DeliveryStatus } from '@/types/deliveryOrder.type';
import { useState } from 'react';
import ShipmentCard from '../../components/CardShipment';
import DriverAuthGuard from '@/hoc/DriverAuthGuard';
import { useAppSelector } from '@/redux/hooks';

const DeliveryOrderPickup = () => {
  const [page, setPage] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user)
  const { data: deliveryOrders, meta: meta, refetch: refetch } = useGetDeliveryOrders({
    // id: id,
    deliveryStatus: String(DeliveryStatus.ON_THE_WAY_TO_OUTLET),
    page: page,
    take: 10,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };  

  return (
    <div className='min-h-dvh flex flex-col gap-2 pt-4 bg-mythemes-grey container px-6'>
      <div className='flex flex-col gap-3'>
        {deliveryOrders.map((deliveryOrder, index) => {
          return (
            <ShipmentCard
              key={index}
              driverId={id}
              shipmentOrderId={deliveryOrder.id}
              status={DeliveryStatus.ON_THE_WAY_TO_CUSTOMER}
              referenceNumber={deliveryOrder.deliveryNumber}
              fullName={deliveryOrder.user.fullName}
              email={deliveryOrder.user.email}
              refetch={refetch}
              buttonLabel="Collected"
              isHistory={false}
              shipmentType='delivery'
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

export default DriverAuthGuard(DeliveryOrderPickup)
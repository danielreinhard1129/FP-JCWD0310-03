'use client'
import Pagination from '@/components/Pagination';
import useGetPickupOrders from '@/hooks/api/pickupOrder/useGetPickupOrders';
import { PickupStatus } from '@/types/pickupOrder.type';
import { useState } from 'react';
import ShipmentCard from '../../components/CardShipment';
import DriverAuthGuard from '@/hoc/DriverAuthGuard';
import { useAppSelector } from '@/redux/hooks';

const PickupOrderRequest = () => {
  const [page, setPage] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user);
  const { data: pickupOrders, meta: meta, refetch: refetch } = useGetPickupOrders({
    id: id,
    pickupStatus: String(PickupStatus.WAITING_FOR_DRIVER),
    page: page,
    take: 10,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className='min-h-dvh flex flex-col gap-2 pt-4 bg-mythemes-grey container px-6'>
      <div className='flex flex-col gap-3'>
        {pickupOrders.map((pickupOrder, index) => {
          return (
            <ShipmentCard
              key={index}
              driverId={id}
              shipmentOrderId={pickupOrder.id}
              status={PickupStatus.ON_THE_WAY_TO_CUSTOMER}
              referenceNumber={pickupOrder.pickupNumber}
              fullName={pickupOrder.user.fullName}
              email={pickupOrder.user.email}
              refetch={refetch}
              buttonLabel="Claim"
              isHistory={false}
              shipmentType='pickup'
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

export default DriverAuthGuard(PickupOrderRequest)
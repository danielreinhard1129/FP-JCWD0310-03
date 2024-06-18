'use client'
import Pagination from '@/components/Pagination';
import useGetPickupOrders from '@/hooks/api/pickupOrder/useGetPickupOrders';
import { PickupStatus } from '@/types/pickupOrder.type';
import { useState } from 'react';
import ShipmentCard from '../../components/CardShipment';

const PickupOrderPickup = () => {
  const [page, setPage] = useState<number>(1);
  // const { id } = useAppSelector((state) => state.user);
  const id = 4;
  const { data: pickupOrders, meta: meta, refetch: refetch } = useGetPickupOrders({
    id: id,
    pickupStatus: String(PickupStatus.On_The_Way_to_Client),
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
              status={PickupStatus.On_The_Way_to_Outlet}
              referenceNumber={pickupOrder.pickupNumber}
              fullName={pickupOrder.user.fullName}
              email={pickupOrder.user.email}
              refetch={refetch}
              buttonLabel="Picked Up"
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

export default PickupOrderPickup
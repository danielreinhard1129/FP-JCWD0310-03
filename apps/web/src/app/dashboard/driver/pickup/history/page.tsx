'use client'
import Pagination from '@/components/Pagination';
import useGetPickupOrders from '@/hooks/api/pickupOrder/useGetPickupOrders';
import { PickupStatus } from '@/types/pickupOrder.type';
import { useState } from 'react';
import ShipmentCard from '../../components/CardShipment';
import DriverAuthGuard from '@/hoc/DriverAuthGuard';
import { useAppSelector } from '@/redux/hooks';
import NoData from '@/app/dashboard/components/noData';

const PickupOrderHistory = () => {
  const [page, setPage] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user);
  const { data: pickupOrders, meta: meta, refetch: refetch } = useGetPickupOrders({
    pickupStatus: String(PickupStatus.RECEIVED_BY_OUTLET),
    page: page,
    take: 10,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className='min-h-dvh flex flex-col gap-2 pt-4 bg-mythemes-grey container px-6'>
      <div className='flex flex-col gap-3'>
        {pickupOrders.length == 0 ? (
          <NoData />
        ) : (
          <>
            {pickupOrders.map((pickupOrder, index) => {
              return (
                <ShipmentCard
                  key={index}
                  driverId={id}
                  shipmentOrderId={pickupOrder.id}
                  status={PickupStatus.RECEIVED_BY_OUTLET}
                  referenceNumber={pickupOrder.pickupNumber}
                  fullName={pickupOrder.user.fullName}
                  email={pickupOrder.user.email}
                  refetch={refetch}
                  buttonLabel="Complete"
                  isHistory={true}
                  shipmentType='pickup'
                  distance=''
                />
              )
            })}
            <div className='flex justify-center bg-green-200 content-center rounded-xl mb-2'>
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

export default DriverAuthGuard(PickupOrderHistory)
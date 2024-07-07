'use client'
import Pagination from '@/components/Pagination';
import DriverAuthGuard from '@/hoc/DriverAuthGuard';
import useGetPickupOrdersByCoord from '@/hooks/api/pickupOrder/useGetPickupOrdersByCoord';
import { useAppSelector } from '@/redux/hooks';
import { PickupStatus } from '@/types/pickupOrder.type';
import { useEffect, useState } from 'react';
import ShipmentCard from '../../components/CardShipment';
import NoData from '@/app/dashboard/components/noData';

const PickupOrderPickup = () => {
  const [page, setPage] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.error(error);
        setLatitude(0);
        setLongitude(0);
      }
    );
  }, []);

  const { data: pickupOrders, meta: meta, refetch: refetch } = useGetPickupOrdersByCoord({
    pickupStatus: String(PickupStatus.ON_THE_WAY_TO_CUSTOMER),
    page: page,
    take: 10,
    latitude: latitude,
    longitude: longitude,
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
                  status={PickupStatus.ON_THE_WAY_TO_OUTLET}
                  referenceNumber={pickupOrder.pickupNumber}
                  fullName={pickupOrder.user.fullName}
                  email={pickupOrder.user.email}
                  refetch={refetch}
                  buttonLabel="Collected"
                  isHistory={false}
                  shipmentType='pickup'
                  distance={pickupOrder.realDistance ? pickupOrder.realDistance.toFixed(1) : '-'}
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

export default DriverAuthGuard(PickupOrderPickup)
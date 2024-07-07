'use client'
import Pagination from '@/components/Pagination';
import useGetDeliveryOrders from '@/hooks/api/deliveryOrder/useGetDeliveryOrders';
import { DeliveryStatus } from '@/types/deliveryOrder.type';
import { useEffect, useState } from 'react';
import ShipmentCard from '../../components/CardShipment';
import DriverAuthGuard from '@/hoc/DriverAuthGuard';
import { useAppSelector } from '@/redux/hooks';
import useGetDeliveryOrdersByCoord from '@/hooks/api/deliveryOrder/useGetDeliveryOrdersByCoord';
import NoData from '@/app/dashboard/components/noData';

const DeliveryOrderRequest = () => {
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

  const { data: deliveryOrders, meta: meta, refetch: refetch } = useGetDeliveryOrdersByCoord({
    deliveryStatus: String(DeliveryStatus.WAITING_FOR_DRIVER),
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
        {deliveryOrders.length == 0 ? (
          <NoData />
        ) : (
          <>
            {deliveryOrders.map((deliveryOrder, index) => {
              return (
                <ShipmentCard
                  key={index}
                  driverId={id}
                  shipmentOrderId={deliveryOrder.id}
                  status={DeliveryStatus.ON_THE_WAY_TO_OUTLET}
                  referenceNumber={deliveryOrder.deliveryNumber}
                  fullName={deliveryOrder.user.fullName}
                  email={deliveryOrder.user.email}
                  refetch={refetch}
                  buttonLabel="Claim"
                  isHistory={false}
                  shipmentType='delivery'
                  distance={deliveryOrder.realDistance ? deliveryOrder.realDistance.toFixed(1) : '-'}
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

export default DriverAuthGuard(DeliveryOrderRequest)
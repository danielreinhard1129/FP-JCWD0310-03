'use client'
import Pagination from '@/components/Pagination';
import useGetPickupOrders from '@/hooks/api/pickupOrder/useGetPickupOrders';
import { PickupStatus } from '@/types/pickupOrder.type';
import { useEffect, useState } from 'react';
import ShipmentCard from '../../components/CardShipment';
import DriverAuthGuard from '@/hoc/DriverAuthGuard';
import { useAppSelector } from '@/redux/hooks';
import useGetPickupOrdersByCoord from '@/hooks/api/pickupOrder/useGetPickupOrdersByCoord';
import noAct from '../../../../../../public/No activity yet.png';
import Image from 'next/image';

const PickupOrderDeliver = () => {
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

  const { data: pickupOrders, meta, refetch, isLoading } = useGetPickupOrdersByCoord({
    pickupStatus: String(PickupStatus.ON_THE_WAY_TO_OUTLET),
    page: page,
    take: 5,
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
          <div className=" flex flex-col place-content-center container gap-2 mt-40">
            <Image
              alt="logo"
              src={noAct}
              className="object-contain opacity-50"
              draggable="false"
            />
            <h1 className="text-center text-2xl font-bold text-gray-400">
              No Activity yet ...
            </h1>
          </div>
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
                  buttonLabel="Picked Up"
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

export default DriverAuthGuard(PickupOrderDeliver)
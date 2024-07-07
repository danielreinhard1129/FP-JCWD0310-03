'use client';
import { Separator } from '@/components/ui/separator';
import DriverAuthGuard from '@/hoc/DriverAuthGuard';
import useGetDeliveryOrdersByCoord from '@/hooks/api/deliveryOrder/useGetDeliveryOrdersByCoord';
import useGetPickupOrdersByCoord from '@/hooks/api/pickupOrder/useGetPickupOrdersByCoord';
import { useAppSelector } from '@/redux/hooks';
import { DeliveryStatus } from '@/types/deliveryOrder.type';
import { PickupStatus } from '@/types/pickupOrder.type';
import { format } from 'date-fns';
import { Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ShipmentCard from './components/CardShipment';

const DriverDashboard = () => {
  const { id, email, fullName, role, isVerify, profilePic, tokenExpiresIn } =
    useAppSelector((state) => state.user);
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
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

  const { data: pickupOrders, refetch: refetchpickup } = useGetPickupOrdersByCoord({
    pickupStatus: String(PickupStatus.WAITING_FOR_DRIVER),
    page: page,
    take: 3,
    latitude: latitude,
    longitude: longitude,
  });

  const { data: deliveryOrders, refetch: refetchdelivery } = useGetDeliveryOrdersByCoord({
    deliveryStatus: String(DeliveryStatus.WAITING_FOR_DRIVER),
    page: page,
    take: 3,
    latitude: latitude,
    longitude: longitude,
  });

  const currentDate = format(new Date(), 'ccc, dd MMM yyyy');

  function capitalize(str: string) {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return (
    <section className="min-h-screen p-0 container relative mx-auto flex flex-col gap-4 mb-5  ">
      <div className="px-6 bg-gradient-green text-white rounded-b-3xl py-6 flex flex-col justify-between h-28">
        <div className="flex justify-between items-start h-20">
          <p className=" text-sm font-bold">{currentDate}</p>
          <div>
            <div className="flex flex-col gap-4 items-center">
              <div className=" bg-white/20 p-1 rounded-full">
                <Bell
                  className="flex flex-col items-center gap-1 text-white cursor-pointer"
                  onClick={() => router.push(`/dashboard/driver/notification`)}
                  size={20}
                />
              </div>
              <p className="font-bold text-xs">{capitalize(fullName)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-6">
        <h1 className="font-bold text-gray-800">Your Jobs</h1>
        <div className="flex gap-6">
          <div onClick={() => router.push('/dashboard/driver/pickup/request')} className='flex flex-col text-center bg-mythemes-maingreen w-1/2 aspect-[3/1] rounded-3xl cursor-pointer'>
            <div className='my-auto'>
              <h1 className="mx-auto my-auto font-medium text-white text-xl">Pickup</h1>
            </div>
          </div>
          <div onClick={() => router.push('/dashboard/driver/delivery/request')} className='flex flex-col text-center border border-mythemes-maingreen w-1/2 aspect-[3/1] rounded-3xl my-auto cursor-pointer'>
            <div className='my-auto'>
              <h1 className="mx-auto my-auto font-medium text-mythemes-maingreen text-xl">Delivery</h1>
            </div>
          </div>
        </div>
        <Separator />
        <h1 className="font-bold text-gray-800">New Pickup Request</h1>
        <div className='flex flex-col gap-3'>
          {pickupOrders.length != 0 ? (
            <>
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
                refetch={refetchpickup}
                buttonLabel="Claim"
                isHistory={false}
                shipmentType='pickup'
                distance={pickupOrder.realDistance ? pickupOrder.realDistance.toFixed(1) : '-'}
                />
              )
            })}
            <div onClick={() => router.push('/dashboard/driver/pickup/request')} className='text-center font-bold py-1 text-gray-600 cursor-pointer'>Show More</div>
            </>
          ) : (
            <div className="text-center font-medium text-gray-600">No new pickup requests available</div>
          )}

        </div>
        <Separator />
        <h1 className="font-bold text-gray-800">New Delivery Request</h1>
        <div className='flex flex-col gap-3'>
          {deliveryOrders.length != 0 ? (
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
                    refetch={refetchdelivery}
                    buttonLabel="Claim"
                    isHistory={false}
                    shipmentType='delivery'
                    distance={deliveryOrder.realDistance ? deliveryOrder.realDistance.toFixed(1) : '-'}
                  />
                )
              })}
              <div onClick={() => router.push('/dashboard/driver/delivery/request')} className='text-center font-bold py-1 text-gray-600 cursor-pointer'>Show More</div>
            </>
          ) : (
            <div className="text-center font-medium text-gray-600">No new delivery requests available</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DriverAuthGuard(DriverDashboard);

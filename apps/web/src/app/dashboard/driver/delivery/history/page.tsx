'use client';
import NoData from '@/app/dashboard/components/noData';
import Pagination from '@/components/Pagination';
import DriverAuthGuard from '@/hoc/DriverAuthGuard';
import useGetDeliveryOrders from '@/hooks/api/deliveryOrder/useGetDeliveryOrders';
import { useAppSelector } from '@/redux/hooks';
import { DeliveryStatus } from '@/types/deliveryOrder.type';
import { useState } from 'react';
import ShipmentCard from '../../components/CardShipment';

const DeliveryOrderHistory = () => {
  const [page, setPage] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user);
  const {
    data: deliveryOrders,
    meta: meta,
    refetch: refetch,
  } = useGetDeliveryOrders({
    deliveryStatus: String(DeliveryStatus.RECEIVED_BY_CUSTOMER),
    page: page,
    take: 10,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className="min-h-dvh flex flex-col gap-2 pt-4 bg-mythemes-grey container px-6">
      <div className="flex flex-col gap-3">
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
                  status={DeliveryStatus.RECEIVED_BY_CUSTOMER}
                  referenceNumber={deliveryOrder.deliveryNumber}
                  fullName={deliveryOrder.user.fullName}
                  email={deliveryOrder.user.email}
                  refetch={refetch}
                  buttonLabel="Complete"
                  isHistory={true}
                  shipmentType="delivery"
                  distance=""
                />
              );
            })}
            <div className="flex justify-center bg-green-200 content-center rounded-xl mb-2">
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
  );
};

export default DriverAuthGuard(DeliveryOrderHistory);

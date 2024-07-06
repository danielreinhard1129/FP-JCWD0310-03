'use client';
import { OrderStatus } from '@/types/order.type';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface OrderCardProps {
  key: number;
  orderId: number;
  orderNumber: string;
  orderStatus: OrderStatus;
  createAt: string;
  refetch: () => void;
  isPaid: boolean;
}

const OrderCard: FC<OrderCardProps> = ({
  key,
  orderId,
  orderNumber,
  orderStatus,
  createAt,
  isPaid,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/user/order/${orderId}`)
  }
  return (
    <div
      key={key}
      className="relative flex overflow-hidden shadow-md bg-white py-3 px-5 rounded-xl"
    >
      <div>
        <div>
          <p className="text-black text-sm font-bold align-top">
            {orderNumber}
          </p>
          <div className="flex gap-2">
            <div className="my-auto">
              <p className="text-xs font-medium text-gray-700">
                {orderStatus === 'WAITING_FOR_PICKUP_DRIVER'
                  ? 'Waiting for Pickup Driver'
                  : orderStatus === 'ON_THE_WAY_TO_CUSTOMER'
                    ? 'On the Way to Customer'
                    : orderStatus === 'ON_THE_WAY_TO_OUTLET'
                      ? 'On the Way to Outlet'
                      : orderStatus === 'ARRIVED_AT_OUTLET'
                        ? 'Arrived at Outlet'
                        : orderStatus === 'READY_FOR_WASHING'
                          ? 'Ready for Washing'
                          : orderStatus === 'BEING_WASHED'
                            ? 'Being Washed'
                            : orderStatus === 'WASHING_COMPLETED'
                              ? 'Washing Completed'
                              : orderStatus === 'BEING_IRONED'
                                ? 'Being Ironed'
                                : orderStatus === 'IRONING_COMPLETED'
                                  ? 'Ironing Completed'
                                  : orderStatus === 'BEING_PACKED'
                                    ? 'Being Packed'
                                    : orderStatus === 'AWAITING_PAYMENT'
                                      ? 'Awaiting Payment'
                                      : orderStatus === 'READY_FOR_DELIVERY'
                                        ? 'Ready for Delivery'
                                        : orderStatus ===
                                          'WAITING_FOR_DELIVERY_DRIVER'
                                          ? 'Waiting for Delivery Driver'
                                          : orderStatus ===
                                            'BEING_DELIVERED_TO_CUSTOMER'
                                            ? 'Being Delivered to Customer'
                                            : orderStatus ===
                                              'RECEIVED_BY_CUSTOMER'
                                              ? 'Received by Customer'
                                              : orderStatus === 'COMPLETED'
                                                ? 'Completed'
                                                : ''}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 h-full w-2 bg-mythemes-secondaryblue"></div>
        <p className="font-bold absolute right-3 top-3 text-xs text-gray-500">
          {createAt}
        </p>
        {orderStatus === OrderStatus.AWAITING_PAYMENT ||
          orderStatus === OrderStatus.READY_FOR_WASHING ||
          orderStatus === OrderStatus.BEING_WASHED ||
          orderStatus === OrderStatus.WASHING_COMPLETED ||
          orderStatus === OrderStatus.BEING_IRONED ||
          orderStatus === OrderStatus.IRONING_COMPLETED ||
          orderStatus === OrderStatus.BEING_PACKED ? (
          isPaid == true ? (
            <button
              onClick={handleClick}
              className="absolute right-3 bottom-3 bg-green-600 text-sm text-white w-1/4 rounded-md"
            >
              Paid
            </button>
          ) : (
            <button
              onClick={handleClick}
              className="absolute right-3 bottom-3 bg-mythemes-maingreen text-sm text-white w-1/4 rounded-md"
            >
              Pay
            </button>
          )
        ) : orderStatus == OrderStatus.RECEIVED_BY_CUSTOMER ? (
          <button
            onClick={handleClick}
            className="absolute right-3 bottom-3 bg-mythemes-maingreen text-sm text-white w-1/4 rounded-md"
          >
            Confirm
          </button>
        ) : orderStatus == OrderStatus.COMPLETED ? (
          <>
          <div onClick={handleClick} className='absolute top-0 left-0 w-full h-full'></div>
          </>
        ) : (
          <>
          <div onClick={handleClick} className='absolute top-0 left-0 w-full h-full'></div>
          </>
        )}
      </div>
    </div>
  );
};
export default OrderCard;

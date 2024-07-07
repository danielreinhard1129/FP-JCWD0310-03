'use client';
import { Separator } from '@/components/ui/separator';
import CustomerAuthGuard from '@/hoc/CustomerAuthGuard';
import useGetOrder from '@/hooks/api/order/useGetOrder';
import useUpdateOrderStatus from '@/hooks/api/order/useUpdateStatusOrder';
import useCreatePayment from '@/hooks/api/payment/useCreatePayment';
import { OrderStatus } from '@/types/order.type';
import { format } from 'date-fns';
import { ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import SkeletonOrderDetail from '../../components/SkeletonOrderDetail';

const OrderDetail = ({ params }: { params: { id: string } }) => {
  const { data, refetch, isLoading: getLoading } = useGetOrder(Number(params.id));
  const router = useRouter();

  const { createPayment, isLoading: loadingCreate } = useCreatePayment();
  const { updateOrderStatus , isLoading: loadingUpdate } = useUpdateOrderStatus();

  let formattedDate;
  if (data) {
    formattedDate = format(new Date(data?.createdAt), 'dd-MM-yyyy');
  }

  const handleUpdate = async () => {
    try {
      if (data != null) {
        const values = {
          orderId: Number(data.id),
          orderStatus: OrderStatus.COMPLETED,
        };
        await updateOrderStatus(values);
        toast.success('Confirmation Success!');
        refetch();
      }
    } catch (error) {
      console.error('Failed to update pickup order', error);
    }
  };

  const handlePayment = async () => {
    try {
      if (data != null) {
        const payValues = {
          orderId: Number(data.id),
        };
        await createPayment(payValues);
        router.push(`${data.id}/transaction`);
      }
    } catch (error) {
      alert('Payment Error!');
    }
  };

  const statusLabels = {
    WAITING_FOR_PICKUP_DRIVER: 'Waiting for Pickup Driver',
    ON_THE_WAY_TO_CUSTOMER: 'On the Way to Customer',
    ON_THE_WAY_TO_OUTLET: 'On the Way to Outlet',
    ARRIVED_AT_OUTLET: 'Arrived at Outlet',
    READY_FOR_WASHING: 'Ready for Washing',
    BEING_WASHED: 'Being Washed',
    WASHING_COMPLETED: 'Washing Completed',
    BEING_IRONED: 'Being Ironed',
    IRONING_COMPLETED: 'Ironing Completed',
    BEING_PACKED: 'Being Packed',
    AWAITING_PAYMENT: 'Awaiting Payment',
    READY_FOR_DELIVERY: 'Ready for Delivery',
    WAITING_FOR_DELIVERY_DRIVER: 'Waiting for Delivery Driver',
    BEING_DELIVERED_TO_CUSTOMER: 'Being Delivered to Customer',
    RECEIVED_BY_CUSTOMER: 'Received by Customer',
    COMPLETED: 'Completed'
  };
  
  const orderStatusLabel = data?.orderStatus ? statusLabels[data.orderStatus] : '';

  
  if (getLoading) {
    return <SkeletonOrderDetail />;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 container p-4 bg-white px-6">
        <div className="relative flex gap-2">
          <Link className="absolute h-6 my-auto" href={'/user/order'}>
            <ChevronLeft className="h-6 my-auto" />
          </Link>
          <h1 className="font-bold mx-auto my-auto">Order Details</h1>
        </div>
      </div>
      <div className="flex flex-col gap-4 container bg-mythemes-grey px-6 min-h-screen py-6">
        <div className="flex flex-col gap-2 p-6 rounded-xl shadow-lg bg-white">
          <div className="flex flex-col pb-4">
            <div className="flex gap-2 justify-start">
              <p className="text-md font-bold text-gray-500">Order</p>
              <p className="text-md font-bold text-mythemes-maingreen">
                {data?.orderNumber}
              </p>
            </div>
            <p className="text-xs font-bold text-gray-500">
              Created on: {formattedDate}
            </p>
          </div>
          <div className="flex flex-col text-gray-700">
            <div className="flex justify-between">
              <p className="text-sm font-semibold">Name</p>
              <p className="text-sm"> {data?.pickupOrder.user.fullName}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold">Email</p>
              <p className="text-sm ">{data?.pickupOrder.user.email}</p>
            </div>
          </div>
          <Separator />
          <div>
            <div className="flex flex-col gap-2">
              <div>
                <div className="flex justify-between text-gray-500">
                  <p className="text-sm font-semibold">Base address</p>
                </div>
                <div className="flex flex-col pl-5 text-left">
                  <p className="text-xs font-semibold text-gray-800">
                    {data?.pickupOrder.user.fullName} HOME
                  </p>
                  <p className="text-xs font-semibold text-gray-500">
                    {data?.pickupOrder.address.city}
                  </p>
                  <p className="text-xs text-gray-500">
                    {data?.pickupOrder.address.addressLine}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-gray-500">
                  <p className="text-sm font-semibold">Outlet address</p>
                </div>
                <div className="flex flex-col pl-5 text-left ">
                  <p className="text-xs font-semibold text-gray-800">
                    {data?.pickupOrder.outlet.outletName}
                  </p>
                  <p className="text-xs font-semibold text-gray-500">
                    {data?.pickupOrder.outlet.address[0].city}
                  </p>
                  <p className="text-xs text-gray-500">
                    {data?.pickupOrder.outlet.address[0].addressLine}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold">Distance</p>
                <p className="text-sm font-semibold">
                  {data?.pickupOrder.distance} km
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-gray-500">
                <p className="text-sm font-semibold">Laundry Items</p>
              </div>
              <div className="flex flex-col pl-5 text-left ">
                {data?.orderItem.map((item, index) => {
                  return (
                    <div key={index} className="flex justify-between">
                      <p className="text-xs font-semibold text-gray-800">
                        {item.laundryItem.itemName}
                      </p>
                      <p className="text-xs font-semibold text-gray-800">
                        {item.qty} Pcs
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold">Weight</p>
                <p className="text-sm font-semibold">{data?.weight} kg</p>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <div className="flex flex-col">
              <div className="flex justify-between text-gray-500">
                <p className="text-sm font-semibold">Price</p>
              </div>
              <div className="flex flex-col pl-5">
                <div className="flex justify-between">
                  <p className="text-xs font-semibold text-gray-800">
                    Pickup Change
                  </p>
                  <p className="text-xs font-semibold text-gray-800">
                    IDR {data?.pickupOrder.pickupPrice}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs font-semibold text-gray-800">
                    Delivery Change
                  </p>
                  <p className="text-xs font-semibold text-gray-800">
                    IDR {data?.pickupOrder.pickupPrice}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Laundry Change</p>
                </div>
                <div className="pl-4 flex justify-between text-xs font-semibold text-gray-800">
                  <p className="my-auto">{data?.weight}KG</p>
                  <p className="my-auto">x</p>
                  <p className="my-auto">IDR 6000/KG</p>
                  <p className="">IDR {data?.laundryPrice}</p>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col">
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Status :</p>
              <div className="flex text-sm h-10 font-bold bg-mythemes-grey rounded text-mythemes-maingreen">
                <p className="my-auto mx-auto text-lg">{orderStatusLabel}

                </p>
              </div>
            </div>
          </div>
        </div>

        {data?.orderStatus === OrderStatus.AWAITING_PAYMENT ||
          data?.orderStatus === OrderStatus.READY_FOR_WASHING ||
          data?.orderStatus === OrderStatus.BEING_WASHED ||
          data?.orderStatus === OrderStatus.WASHING_COMPLETED ||
          data?.orderStatus === OrderStatus.BEING_IRONED ||
          data?.orderStatus === OrderStatus.IRONING_COMPLETED ||
          data?.orderStatus === OrderStatus.BEING_PACKED ? (
          data?.isPaid == true ? (
            <button
              onClick={handlePayment}
              className="bg-green-600 text-white p-1 rounded-xl"
              disabled={loadingCreate}
            >
               {loadingCreate ? <Loader2 className="mx-auto animate-spin" /> : `Your Invoice`}
               {loadingCreate ?? 'Success !'}
            </button>
          ) : (
            <button
              onClick={handlePayment}
              className="bg-mythemes-maingreen text-white p-1 rounded-xl"
              disabled={loadingCreate}
            >
              {loadingCreate ? <Loader2 className="mx-auto animate-spin" /> : `Pay`}
              {loadingCreate ?? 'Success !'}
            </button>
          )
        ) : data?.orderStatus == OrderStatus.RECEIVED_BY_CUSTOMER ? (
          <button
            onClick={handleUpdate}
            className="bg-mythemes-maingreen text-white p-1 rounded-xl"
            disabled={loadingUpdate}
          >
            {loadingUpdate ? <Loader2 className="mx-auto animate-spin" /> : `Confirm`}
            {loadingUpdate ?? 'Success !'}
          </button>
        ) : data?.orderStatus == OrderStatus.COMPLETED ? (
          <>
          </>
      ) : (
      <>
      </>
        )}
    </div>
    </div >
  );
};

export default CustomerAuthGuard(OrderDetail);

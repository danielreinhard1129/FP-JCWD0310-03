'use client'
import { Separator } from '@/components/ui/separator';
import useGetDeliveryOrder from '@/hooks/api/deliveryOrder/useGetDeliveryOrder';
import useUpdateDeliveryOrder from '@/hooks/api/deliveryOrder/useUpdateDeliveryOrder';
import { useAppSelector } from '@/redux/hooks';
import { DeliveryStatus } from '@/types/deliveryOrder.type';
import { format } from 'date-fns';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import SkeletonDetails from '../../components/SkeletonDetails';
import DriverAuthGuard from '@/hoc/DriverAuthGuard';

const DeliveryDetails = ({ params }: { params: { id: string } }) => {
  const { deliveryOrder, refetch, isLoading: getLoading } = useGetDeliveryOrder(Number(params.id));
  const { id } = useAppSelector((state) => state.user);
  const router = useRouter()

  let formattedDate
  if (deliveryOrder) {
    formattedDate = format(new Date(deliveryOrder?.createdAt), 'dd-MM-yyyy');
  }

  let status
  let label

  if (deliveryOrder?.deliveryStatus == DeliveryStatus.WAITING_FOR_DRIVER) {
    status = DeliveryStatus.ON_THE_WAY_TO_OUTLET,
      label = "Claim"
  }
  if (deliveryOrder?.deliveryStatus == DeliveryStatus.ON_THE_WAY_TO_OUTLET) {
    status = DeliveryStatus.ON_THE_WAY_TO_CUSTOMER,
      label = "Collected"
  }
  if (deliveryOrder?.deliveryStatus == DeliveryStatus.ON_THE_WAY_TO_CUSTOMER) {
    status = DeliveryStatus.RECEIVED_BY_CUSTOMER,
      label = "Delivered"
  }
  if (deliveryOrder?.deliveryStatus == DeliveryStatus.RECEIVED_BY_CUSTOMER) {
    label = "Completed"
  }

  const values = {
    shipmentOrderId: Number(params.id),
    driverId: Number(id),
    status: String(status)
  }

  const { updateDeliveryOrder, isLoading } = useUpdateDeliveryOrder()

  const handleUpdate = async () => {
    try {
      await updateDeliveryOrder(values);
      toast.success(`Succeess!`);
      router.back()
    } catch (error) {
      console.error('Failed to update delivery order', error);
    }
  };

  if (getLoading) {
    return <SkeletonDetails />;
  }
  return (
    <div>
      <div className='flex flex-col gap-4 container p-4 bg-white px-6'>
        <div className='relative flex gap-2'>
          <ChevronLeft onClick={() => { router.back() }} className='absolute h-6 my-auto' />
          <h1 className='font-bold mx-auto my-auto'>Delivery Details</h1>
        </div>
      </div>
      <div className='flex flex-col gap-4 container bg-mythemes-grey px-6 min-h-screen py-6'>
        <div className='flex flex-col gap-2 p-6 rounded-xl shadow-lg bg-white'>
          <div className='flex flex-col pb-4'>
            <div className='flex gap-2 justify-start'>
              <p className='text-md font-bold text-gray-500'>Delivery</p>
              <p className='text-md font-bold text-mythemes-maingreen'>{deliveryOrder?.deliveryNumber}</p>
            </div>
            <p className='text-xs font-bold text-gray-500'>Created on: {formattedDate}</p>
          </div>
          <div className='flex flex-col text-gray-700'>
            <div className='flex justify-between'>
              <p className='text-sm font-semibold'>Name</p>
              <p className='text-sm'> {deliveryOrder?.user.fullName}</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-sm font-semibold'>Email</p>
              <p className='text-sm '>{deliveryOrder?.user.email}</p>
            </div>
          </div>
          <Separator />
          <div>
            <div className='flex flex-col gap-2'>
              <div >
                <div className='flex justify-between text-gray-500'>
                  <p className='text-sm font-semibold'>Base address</p>
                </div>
                <div className='flex flex-col pl-5 text-left'>
                  <p className='text-xs font-semibold text-gray-800'>{deliveryOrder?.user.fullName} HOME</p>
                  <p className='text-xs font-semibold text-gray-500'>{deliveryOrder?.address.city}</p>
                  <p className='text-xs text-gray-500'>{deliveryOrder?.address.addressLine}</p>
                </div>
              </div>
              <div>
                <div className='flex justify-between text-gray-500'>
                  <p className='text-sm font-semibold'>Outlet address</p>
                </div>
                <div className='flex flex-col pl-5 text-left '>
                  <p className='text-xs font-semibold text-gray-800'>{deliveryOrder?.order.pickupOrder.outlet.outletName}</p>
                  <p className='text-xs font-semibold text-gray-500'>{deliveryOrder?.order.pickupOrder.outlet.address[0].city}</p>
                  <p className='text-xs text-gray-500'>{deliveryOrder?.order.pickupOrder.outlet.address[0].addressLine}</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm font-semibold'>Distance</p>
                <p className='text-sm font-semibold'>{deliveryOrder?.distance} km</p>
              </div>
            </div>
          </div>
          <Separator />
          <div className='flex flex-col'>
            <div className='flex justify-start gap-2'>
              <p className='text-sm font-semibold'>Delivery By : </p>
              <p className='text-sm font-semibold'> {deliveryOrder?.driver?.user.fullName}</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-sm font-semibold'>Status :</p>
              <div className='flex text-sm h-10 font-bold bg-mythemes-grey rounded text-mythemes-maingreen'>
                <p className='my-auto mx-auto text-lg'>{deliveryOrder?.deliveryStatus}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${deliveryOrder?.deliveryStatus == DeliveryStatus.RECEIVED_BY_CUSTOMER || deliveryOrder?.deliveryStatus == DeliveryStatus.NOT_READY_TO_DELIVER ? 'hidden' : 'block'}`}>
          <button onClick={handleUpdate} disabled={isLoading} className='bg-mythemes-maingreen text-white p-1 rounded-xl w-full'>
            {isLoading ? <Loader2 className="mx-auto animate-spin" /> : `${label}`}
            {isLoading ?? 'Success !'}
          </button>
        </div>
      </div>
    </div>
  )
}


export default DriverAuthGuard(DeliveryDetails)
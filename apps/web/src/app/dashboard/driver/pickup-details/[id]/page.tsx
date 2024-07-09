'use client'
import { Separator } from '@/components/ui/separator';
import useGetPickupOrder from '@/hooks/api/pickupOrder/useGetPickupOrder';
import useUpdatePickupOrder from '@/hooks/api/pickupOrder/useUpdatePickupOrder';
import { useAppSelector } from '@/redux/hooks';
import { PickupStatus } from '@/types/pickupOrder.type';
import { format } from 'date-fns';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import SkeletonDetails from '../../components/SkeletonDetails';
import { replaceUnderscoreWithSpace } from '@/utils/replaceUnderscoreWithSpace';

const PickupDetails = ({ params }: { params: { id: string } }) => {
  const { pickupOrder, refetch, isLoading: getLoading } = useGetPickupOrder(Number(params.id));
  const { id } = useAppSelector((state) => state.user);
  const router = useRouter()

  let formattedDate
  if (pickupOrder) {
    formattedDate = format(new Date(pickupOrder?.createdAt), 'dd-MM-yyyy');
  }

  let status
  let label

  if (pickupOrder?.pickupStatus == PickupStatus.WAITING_FOR_DRIVER) {
    status = PickupStatus.ON_THE_WAY_TO_CUSTOMER,
      label = "Claim"
  }
  if (pickupOrder?.pickupStatus == PickupStatus.ON_THE_WAY_TO_CUSTOMER) {
    status = PickupStatus.ON_THE_WAY_TO_OUTLET,
      label = "Collected"
  }
  if (pickupOrder?.pickupStatus == PickupStatus.ON_THE_WAY_TO_OUTLET) {
    status = PickupStatus.RECEIVED_BY_OUTLET,
      label = "Picked Up"
  }
  if (pickupOrder?.pickupStatus == PickupStatus.RECEIVED_BY_OUTLET) {
    label = "Completed"
  }

  const values = {
    shipmentOrderId: Number(params.id),
    driverId: Number(id),
    status: String(status)
  }

  const { updatePickupOrder, isLoading } = useUpdatePickupOrder()

  const handleUpdate = async () => {
    try {
      await updatePickupOrder(values);
      toast.success(`Succeess!`);
      router.back()
    } catch (error) {
      console.error('Failed to update pickup order', error);
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
          <h1 className='font-bold mx-auto my-auto'>Pickup Details</h1>
        </div>
      </div>
      <div className='flex flex-col gap-4 container bg-mythemes-grey px-6 min-h-screen py-6'>
        <div className='flex flex-col gap-2 p-6 rounded-xl shadow-lg bg-white'>
          <div className='flex flex-col pb-4'>
            <div className='flex gap-2 justify-start'>
              <p className='text-md font-bold text-gray-500'>Pickup</p>
              <p className='text-md font-bold text-mythemes-maingreen'>{pickupOrder?.pickupNumber}</p>
            </div>
            <p className='text-xs font-bold text-gray-500'>Created on: {formattedDate}</p>
          </div>
          <div className='flex flex-col text-gray-700'>
            <div className='flex justify-between'>
              <p className='text-sm font-semibold'>Name</p>
              <p className='text-sm'> {pickupOrder?.user.fullName}</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-sm font-semibold'>Email</p>
              <p className='text-sm '>{pickupOrder?.user.email}</p>
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
                  <p className='text-xs font-semibold text-gray-800'>{pickupOrder?.user.fullName} HOME</p>
                  <p className='text-xs font-semibold text-gray-500'>{pickupOrder?.address.city}</p>
                  <p className='text-xs text-gray-500'>{pickupOrder?.address.addressLine}</p>
                </div>
              </div>
              <div>
                <div className='flex justify-between text-gray-500'>
                  <p className='text-sm font-semibold'>Outlet address</p>
                </div>
                <div className='flex flex-col pl-5 text-left '>
                  <p className='text-xs font-semibold text-gray-800'>{pickupOrder?.outlet.outletName}</p>
                  <p className='text-xs font-semibold text-gray-500'>{pickupOrder?.outlet.address[0].city}</p>
                  <p className='text-xs text-gray-500'>{pickupOrder?.outlet.address[0].addressLine}</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm font-semibold'>Distance</p>
                <p className='text-sm font-semibold'>{pickupOrder?.distance} km</p>
              </div>
            </div>
          </div>
          <Separator />
          <div className='flex flex-col'>
            <div className='flex justify-start gap-2'>
              <p className='text-sm font-semibold'>Pickup By : </p>
              <p className='text-sm font-semibold'> {pickupOrder?.driver?.user.fullName}</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-sm font-semibold'>Status :</p>
              <div className='flex text-sm h-10 font-bold bg-mythemes-grey rounded text-mythemes-maingreen'>
                <p className='my-auto mx-auto text-lg'>{pickupOrder != undefined ? replaceUnderscoreWithSpace(`${pickupOrder?.pickupStatus}`):''}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${pickupOrder?.pickupStatus == PickupStatus.RECEIVED_BY_OUTLET ? 'hidden' : 'block'}`}>
          <button onClick={handleUpdate} disabled={isLoading} className='bg-mythemes-maingreen text-white p-1 rounded-xl w-full'>
          {isLoading ? <Loader2 className="mx-auto animate-spin" /> : `${label}`}  
          {isLoading ?? 'Success !'}      
          </button>
        </div>


      </div>
    </div>
  )
}

export default PickupDetails
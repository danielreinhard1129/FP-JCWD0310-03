'use client'
import { Separator } from '@/components/ui/separator';
import useGetOrder from '@/hooks/api/order/useGetOrder';
import useUpdateOrderStatus from '@/hooks/api/order/useUpdateStatusOrder';
import { useAppSelector } from '@/redux/hooks';
import { format } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ItemCheckingDialog from '../../components/ItemCheckingDialog';
import useGetUser from '@/hooks/api/user/useGetUser';
import { OrderStatus } from '@/types/order.type';
import { EmployeeWorkShift } from '@/types/employee.type';

const BagDetails = ({ params }: { params: { slug: string[] } }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { data, refetch, isLoading } = useGetOrder(Number(params.slug[0]));
  const { id } = useAppSelector((state) => state.user)
  const router = useRouter()
  const { user } = useGetUser();

  let targetStatus
  let buttonLabel

  if (data?.orderStatus == OrderStatus.READY_FOR_WASHING) {
    targetStatus = OrderStatus.BEING_WASHED,
      buttonLabel = "Claim"
  }
  if (data?.orderStatus == OrderStatus.BEING_WASHED) {
    targetStatus = OrderStatus.WASHING_COMPLETED,
      buttonLabel = "Finish"
  }
  if (data?.orderStatus == OrderStatus.WASHING_COMPLETED) {
    targetStatus = OrderStatus.BEING_IRONED,
      buttonLabel = "Claim"
  }
  if (data?.orderStatus == OrderStatus.BEING_IRONED) {
    targetStatus = OrderStatus.IRONING_COMPLETED,
      buttonLabel = "Finish"
  }
  if (data?.orderStatus == OrderStatus.IRONING_COMPLETED) {
    targetStatus = OrderStatus.BEING_PACKED,
      buttonLabel = "Claim"
  }
  if (data?.orderStatus == OrderStatus.BEING_PACKED) {
    targetStatus = OrderStatus.AWAITING_PAYMENT,
      buttonLabel = "Finish"
  }

  let isHidden: boolean = true

  if (params.slug[2] == "on-going") {
    if (params.slug[1] == "washing") {
      if (data?.orderStatus == OrderStatus.BEING_WASHED) {
        isHidden = false
      }
    }
    if (params.slug[1] == "ironing") {
      if (data?.orderStatus == OrderStatus.BEING_IRONED) {
        isHidden = false
      }
    }
    if (params.slug[1] == "packing") {
      if (data?.orderStatus == OrderStatus.BEING_PACKED) {
        isHidden = false
      }
    }
  }

  const values = {
    orderId: Number(data?.id),
    workerId: Number(id),
    orderStatus: targetStatus as OrderStatus
  }

  const { updateOrderStatus } = useUpdateOrderStatus()

  const handleUpdate = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await updateOrderStatus(values);
      router.back();
    } catch (error) {
      console.error('Failed to update pickup order', error);
    }
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const currentHour = now.getHours();

      if (user?.employee.workShift === EmployeeWorkShift.DAY) {
        if (currentHour >= 6 && currentHour < 18) {
          setIsDisable(false);
        } else {
          setIsDisable(true);
        }
      } else if (user?.employee.workShift === EmployeeWorkShift.NIGHT) {
        if (currentHour >= 18 || currentHour < 6) {
          setIsDisable(false);
        } else {
          setIsDisable(true);
        }
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);

    return () => clearInterval(interval);
  }, [user?.employee.workShift]);


  let formattedDate
  if (data) {
    formattedDate = format(new Date(data?.createdAt), 'dd-MM-yyyy');
  }

  let isBypassRequest: boolean | undefined = false
  let isBypassAccepted: boolean | undefined = false
  let isBypassRejected: boolean | undefined = false

  if (params.slug[1] == "washing") {
    isBypassRequest = data?.orderWorker[0]?.bypassRequest
    isBypassAccepted = data?.orderWorker[0]?.bypassAccepted
    isBypassRejected = data?.orderWorker[0]?.bypassRejected
  }
  if (params.slug[1] == "ironing") {
    isBypassRequest = data?.orderWorker[1]?.bypassRequest
    isBypassAccepted = data?.orderWorker[1]?.bypassAccepted
    isBypassRejected = data?.orderWorker[1]?.bypassRejected
  }
  if (params.slug[1] == "packing") {
    isBypassRequest = data?.orderWorker[2]?.bypassRequest
    isBypassAccepted = data?.orderWorker[2]?.bypassAccepted
    isBypassRejected = data?.orderWorker[2]?.bypassRejected
  }

  return (
    <div>
      <div className='flex flex-col gap-4 container p-4 bg-white px-6'>
        <div className='relative flex gap-2'>
          <ChevronLeft onClick={() => router.back()} className='absolute h-6 my-auto' />
          <h1 className='font-bold mx-auto my-auto'>Bag Details</h1>
        </div>
      </div>
      <div className='flex flex-col gap-4 container bg-mythemes-grey px-6 min-h-screen py-6'>
        <div className='flex flex-col gap-2 p-6 rounded-xl shadow-lg bg-white'>
          <div className='flex flex-col pb-4'>
            <div className='flex gap-2 justify-start'>
              <p className='text-md font-bold text-gray-500'>Order</p>
              <p className='text-md font-bold text-mythemes-maingreen'>{data?.orderNumber}</p>
            </div>
            <p className='text-xs font-bold text-gray-500'>Created on: {formattedDate}</p>
          </div>
          <div className='flex flex-col text-gray-700'>
            <div className='flex justify-between'>
              <p className='text-sm font-semibold'>Name</p>
              <p className='text-sm'> {data?.pickupOrder.user.fullName}</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-sm font-semibold'>Email</p>
              <p className='text-sm '>{data?.pickupOrder.user.email}</p>
            </div>
          </div>
          <Separator />
          <div>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between text-gray-500'>
                <p className='text-sm font-semibold'>Laundry Items</p>
              </div>
              <div className='flex flex-col pl-5 text-left '>
                {data?.orderItem.map((item, index) => {
                  return (
                    <div key={index} className='flex justify-between'>
                      <p className='text-xs font-semibold text-gray-800'>{item.laundryItem.itemName}</p>
                      <p className='text-xs font-semibold text-gray-800'>{item.qty} Pcs</p>
                    </div>
                  )
                })}
              </div>
              <div className='flex justify-between'>
                <p className='text-sm font-semibold'>Weight</p>
                <p className='text-sm font-semibold'>{data?.weight} kg</p>
              </div>
            </div>
          </div>
          <Separator />
          <div className='flex flex-col'>
            <div className='flex justify-start gap-2'>
              <p className='text-sm font-semibold'>Washing by : </p>
              <p className='text-sm font-semibold'> {data?.orderWorker[0]?.worker.user.fullName}</p>
            </div>
            <div className='flex justify-start gap-2'>
              <p className='text-sm font-semibold'>Ironing by: </p>
              <p className='text-sm font-semibold'> {data?.orderWorker[1]?.worker.user.fullName}</p>
            </div>
            <div className='flex justify-start gap-2'>
              <p className='text-sm font-semibold'>Packing by: </p>
              <p className='text-sm font-semibold'> {data?.orderWorker[2]?.worker.user.fullName}</p>
            </div>
            {/* <div className='flex flex-col'>
              <p className='text-sm font-semibold'>Status :</p>
              <div className='flex text-sm h-10 font-bold bg-mythemes-grey rounded text-mythemes-maingreen'>
                <p className='my-auto mx-auto text-lg'>{data?.orderStatus}</p>
              </div>
            </div> */}
          </div>
        </div>

        {params.slug[2] != "history" ? (
          <>
            {params.slug[2] != "request" ? (
              (isHidden ? (
                <></>
              ) : (
                (isBypassRequest == false ? (
                  <>
                    <button onClick={handleUpdate} className='bg-mythemes-maingreen text-white p-1 rounded-xl w-full'>{buttonLabel}</button>
                  </>
                ) : (
                  (isBypassAccepted == true ? (
                    <>
                      <button onClick={handleUpdate} className='bg-yellow-600 text-white p-1 rounded-xl w-full'>{buttonLabel}</button>
                    </>
                  ) : (
                    (isBypassRejected == true ? (
                      <>
                        <button disabled className='bg-red-600 text-white p-1 rounded-xl w-full'>Bypass Rejected</button>
                      </>
                    ) : (
                      <>
                        <button disabled className='bg-mythemes-dimgrey text-white p-1 rounded-xl w-full'>Bypass Requested</button>
                      </>
                    ))
                  ))
                ))
              ))
            ) : (
              <>
                <button disabled={isDisable} onClick={handleDialogOpen} className={`text-white p-1 rounded-xl w-full ${isDisable ? 'bg-mythemes-secondarygreen' : 'bg-mythemes-maingreen'}`} >{buttonLabel}</button>

                <ItemCheckingDialog
                  isOpen={isDialogOpen}
                  onClose={handleDialogClose}
                  orderId={Number(params.slug[0])}
                  refetch={refetch}
                  targetStatus={String(targetStatus)}
                  workerId={id}
                />

              </>
            )}
          </>
        ) : (
          (isBypassRejected == true ? (
            <>
              <button disabled className='bg-red-600 text-white p-1 rounded-xl w-full'>Bypass Rejected</button>
            </>
          ) : (
            <>
            </>
          ))
        )}
      </div>
    </div>
  )
}

export default BagDetails
'use client'
import { Separator } from '@/components/ui/separator';
import useGetOrder from '@/hooks/api/order/useGetOrder';
import useCreatePayment from '@/hooks/api/payment/useCreatePayment';
import { format } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const OrderDetail = ({ params }: { params: { id: string } }) => {
  const { data, refetch, isLoading } = useGetOrder(Number(params.id));
  const router = useRouter()

  const { createPayment } = useCreatePayment()

  let formattedDate
  if (data) {
    formattedDate = format(new Date(data?.createdAt), 'dd-MM-yyyy');
  }

  const handlePayment = async () => {
    try {
      if (data != null) {
        const payValues = {
          orderId: Number(data.id)
        }
        await createPayment(payValues);
        router.push(`${data.id}/transaction`)
      }
    } catch (error) {
      alert('Payment Error!')
    }
  }

  return (
    <div>
      <div className='flex flex-col gap-4 container p-4 bg-white px-6'>
        <div className='relative flex gap-2'>
          <Link className='absolute h-6 my-auto' href={"/user/order"}>
            <ChevronLeft className='h-6 my-auto' />
          </Link>
          <h1 className='font-bold mx-auto my-auto'>Order Details</h1>
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
              <div >
                <div className='flex justify-between text-gray-500'>
                  <p className='text-sm font-semibold'>Base address</p>
                </div>
                <div className='flex flex-col pl-5 text-left'>
                  <p className='text-xs font-semibold text-gray-800'>{data?.pickupOrder.user.fullName} HOME</p>
                  <p className='text-xs font-semibold text-gray-500'>{data?.pickupOrder.address.city}</p>
                  <p className='text-xs text-gray-500'>{data?.pickupOrder.address.addressLine}</p>
                </div>
              </div>
              <div>
                <div className='flex justify-between text-gray-500'>
                  <p className='text-sm font-semibold'>Outlet address</p>
                </div>
                <div className='flex flex-col pl-5 text-left '>
                  <p className='text-xs font-semibold text-gray-800'>{data?.pickupOrder.outlet.outletName}</p>
                  <p className='text-xs font-semibold text-gray-500'>{data?.pickupOrder.outlet.address[0].city}</p>
                  <p className='text-xs text-gray-500'>{data?.pickupOrder.outlet.address[0].addressLine}</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm font-semibold'>Distance</p>
                <p className='text-sm font-semibold'>{data?.pickupOrder.distance} km</p>
              </div>
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
          <div>
            <div className='flex flex-col'>
              <div className='flex justify-between text-gray-500'>
                <p className='text-sm font-semibold'>Price</p>
              </div>
              <div className='flex flex-col pl-5'>
                <div className='flex justify-between'>
                  <p className='text-xs font-semibold text-gray-800'>Pickup Change</p>
                  <p className='text-xs font-semibold text-gray-800'>IDR {data?.pickupOrder.pickupPrice}</p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-xs font-semibold text-gray-800'>Delivery Change</p>
                  <p className='text-xs font-semibold text-gray-800'>IDR {data?.pickupOrder.pickupPrice}</p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-sm'>Laundry Change</p>
                </div>
                <div className='pl-4 flex justify-between text-xs font-semibold text-gray-800'>
                  <p className='my-auto'>{data?.weight}KG</p>
                  <p className='my-auto'>x</p>
                  <p className='my-auto'>IDR 6000/KG</p>
                  <p className=''>IDR {data?.laundryPrice}</p>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <p className='text-sm font-semibold'>Status :</p>
              <div className='flex text-sm h-10 font-bold bg-mythemes-grey rounded text-mythemes-maingreen'>
                <p className='my-auto mx-auto text-lg'>{data?.orderStatus}</p>
              </div>
            </div>
          </div>
        </div>

        {data?.isPaid == true ? (
          <button onClick={handlePayment} className='bg-mythemes-maingreen text-white p-1 rounded-xl'>Your Invoice</button>
        ) : (
          <button onClick={handlePayment} className='bg-mythemes-maingreen text-white p-1 rounded-xl'>Pay</button>
        )}


      </div>
    </div>
  )
}

export default OrderDetail
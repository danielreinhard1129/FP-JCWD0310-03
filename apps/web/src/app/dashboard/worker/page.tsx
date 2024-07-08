'use client';

import WorkerAuthGuard from '@/hoc/WorkerAuthGuard';
import useGetOrders from '@/hooks/api/order/useGetOrders';
import useGetUser from '@/hooks/api/user/useGetUser';
import { useAppSelector } from '@/redux/hooks';
import { EmployeeStation } from '@/types/employee.type';
import { OrderStatus } from '@/types/order.type';
import { format } from 'date-fns';
import { Bell, LucidePackageCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TbIroning, TbWash } from 'react-icons/tb';
import NoData from '../components/noData';
import WashingCard from './components/WashingCard';

const DashboardWorker = () => {
  const { id, email, fullName, role, isVerify, profilePic, tokenExpiresIn } =
    useAppSelector((state) => state.user);
  const router = useRouter();
  const { user } = useGetUser();

  let filterStatus

  if (user?.employee.station == EmployeeStation.WASHING) {
    filterStatus = OrderStatus.READY_FOR_WASHING
  }
  if (user?.employee.station == EmployeeStation.IRONING) {
    filterStatus = OrderStatus.WASHING_COMPLETED
  }
  if (user?.employee.station == EmployeeStation.PACKING) {
    filterStatus = OrderStatus.IRONING_COMPLETED
  }

  const { data: orders, meta, refetch } = useGetOrders({
    page: 1,
    take: 4,
    filterStatus: String(filterStatus)
  });

  const currentDate = format(new Date(), 'ccc, dd MMM yyyy');

  function capitalize(str: string) {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return (
    <section className="min-h-screen p-0 container relative mx-auto flex flex-col gap-4 mb-5 bg-mythemes-grey">
      <div className="px-6 bg-gradient-green text-white rounded-b-3xl py-6 flex flex-col justify-between h-28">
        <div className="flex justify-between items-start h-20">
          <p className=" text-sm font-bold">{currentDate}</p>
          <div>
            <div className="flex flex-col gap-4 items-center">
              <div className=" bg-white/20 p-1 rounded-full">
                <Bell
                  className="flex flex-col items-center gap-1 text-white cursor-pointer"
                  onClick={() => router.push(`/dashboard/worker/notification`)}
                  size={20}
                />
              </div>
              <p className="font-bold text-xs">{capitalize(fullName)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-6">
        <h1 className="font-bold text-gray-800">Your Jobs</h1>
        <div className="flex flex-col gap-3">
          <button
            disabled={user?.employee.station !== EmployeeStation.WASHING}
            className={`${user?.employee.station !== EmployeeStation.WASHING ? `hidden` : `block`} flex items-center bg-mythemes-one py-4 px-12 rounded-xl hover:bg-mythemes-one/70 transition duration-300 ease-in-out disabled:bg-mythemes-one/70`}
            onClick={() => router.push('/dashboard/worker/washing/request')}
          >
            <TbWash className="h-6 w-6 text-white mr-3" />
            <h1 className="font-bold text-white text-lg">Washing Station</h1>
          </button>
          <button
            disabled={user?.employee.station !== EmployeeStation.IRONING}
            className={`${user?.employee.station !== EmployeeStation.IRONING ? `hidden` : `block`} flex items-center bg-mythemes-two py-4 px-12 rounded-xl hover:bg-mythemes-two/70 transition duration-300 ease-in-out disabled:bg-mythemes-two/70`}
            onClick={() => router.push('/dashboard/worker/ironing/request')}
          >
            <TbIroning className="h-6 w-6 text-white mr-3" />
            <h1 className="font-bold text-white text-lg">Ironing Station</h1>
          </button>
          <button
            disabled={user?.employee.station !== EmployeeStation.PACKING}
            className={`${user?.employee.station !== EmployeeStation.PACKING ? `hidden` : `block`} flex items-center bg-mythemes-three py-4 px-12 rounded-xl hover:bg-mythemes-three/70 transition duration-300 ease-in-out disabled:bg-mythemes-three/70`}
            onClick={() => router.push('/dashboard/worker/packing/request')}
          >
            <LucidePackageCheck className="h-6 w-6 text-white mr-3" />
            <h1 className="font-bold text-white text-lg">Packing Station</h1>
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-3 px-6'>
        <h1 className="font-bold text-gray-800">New Job Request</h1>
        {orders.length == 0 ? (
          <NoData />
        ) : (
          (user?.employee.station == EmployeeStation.WASHING ? (
            <>
              {orders.map((order, index) => {
                return (
                  <WashingCard
                    key={index}
                    workerId={id}
                    orderId={order.id}
                    targetStatus={OrderStatus.BEING_WASHED}
                    referenceNumber={order.orderNumber}
                    fullName={order.pickupOrder?.user?.fullName}
                    email={order.pickupOrder?.user?.email}
                    refetch={refetch}
                    buttonLabel="Claim"
                    isHistory={false}
                    weight={order.weight}
                    isItemChecking={true}
                    isBypassRequest={false}
                    isBypassAccepted={false}
                    isBypassRejected={false}
                    employeeWorkShift={user?.employee?.workShift}
                  />
                )
              })}
              <div onClick={() => router.push('/dashboard/worker/washing/request')} className='text-center font-bold py-1 text-gray-600 cursor-pointer'>Show More</div>
            </>
          ) : (
            (user?.employee.station == EmployeeStation.IRONING ? (
              <>
                {orders.map((order, index) => {
                  return (
                    <WashingCard
                      key={index}
                      workerId={id}
                      orderId={order.id}
                      targetStatus={OrderStatus.BEING_IRONED}
                      referenceNumber={order.orderNumber}
                      fullName={order.pickupOrder?.user?.fullName}
                      email={order.pickupOrder?.user?.email}
                      refetch={refetch}
                      buttonLabel="Claim"
                      isHistory={false}
                      weight={order.weight}
                      isItemChecking={true}
                      isBypassRequest={false}
                      isBypassAccepted={false}
                      isBypassRejected={false}
                      employeeWorkShift={user?.employee?.workShift}
                    />
                  )
                })}
                <div onClick={() => router.push('/dashboard/worker/ironing/request')} className='text-center font-bold py-1 text-gray-600 cursor-pointer'>Show More</div>
              </>
            ) : (
              <>
                {orders.map((order, index) => {
                  return (
                    <WashingCard
                      key={index}
                      workerId={id}
                      orderId={order.id}
                      targetStatus={OrderStatus.BEING_PACKED}
                      referenceNumber={order.orderNumber}
                      fullName={order.pickupOrder?.user?.fullName}
                      email={order.pickupOrder?.user?.email}
                      refetch={refetch}
                      buttonLabel="Claim"
                      isHistory={false}
                      weight={order.weight}
                      isItemChecking={true}
                      isBypassRequest={false}
                      isBypassAccepted={false}
                      isBypassRejected={false}
                      employeeWorkShift={user?.employee?.workShift}
                    />
                  )
                })}
                <div onClick={() => router.push('/dashboard/worker/packing/request')} className='text-center font-bold py-1 text-gray-600 cursor-pointer'>Show More</div>
              </>
            ))
          ))
        )}
      </div>
    </section>
  );
};

export default WorkerAuthGuard(DashboardWorker);

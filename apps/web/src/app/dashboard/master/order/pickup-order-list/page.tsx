'use client'
import Pagination from '@/components/Pagination'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useGetPickupOrders from '@/hooks/api/pickupOrder/useGetPickupOrders'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import TablePickupOrder from './components/TablePickupOrder'
import { PickupStatus } from '@/types/pickupOrder.type'
import useGetUser from '@/hooks/api/user/useGetUser'

const PickupOrderList = () => {
  const [page, setPage] = useState<number>(1);
  // const { id } = useAppSelector((state) => state.user);
  const id = 0
  const { data: pickupOrders, meta, refetch } = useGetPickupOrders({
    id: id,
    page,
    take: 5,
    pickupStatus: String(PickupStatus.RECEIVED_BY_OUTLET),
    isOrderCreated: Number(Boolean(false))
  });

  const {user} = useGetUser();

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };
  return (
    <div className="flex flex-col">
      <div className="p-6 flex gap-2 my-auto ">
        <Link className="my-auto" href={"/dashboard/master/order"}>
          <ChevronLeft />
        </Link>
        <h1 className="text-lg font-bold my-auto">Create Order</h1>
      </div>
      <div className="mx-8 mb-8">
        <h1 className="text-md font-bold my-auto">Choose Pickup Order to Create Order</h1>
        
        <Table className='bg-mythemes-secondarygreen rounded-xl'>
          <TableHeader>
            <TableRow>
              <TableHead>Pickup Number</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Outlet</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pickupOrders.map((pickupOrder, index) => {
              return (
                <TablePickupOrder
                  key={index}
                  pickupOrderId={pickupOrder.id}
                  pickupNumber={pickupOrder.pickupNumber}
                  name={pickupOrder.user.fullName}
                  email={pickupOrder.user.email}
                  outlet={pickupOrder.outlet.outletName}
                  status={pickupOrder.pickupStatus}
                  createdAt={String(pickupOrder.createdAt)}
                  employeeWorkShift={user?.employee?.workShift}
                />
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        />
      </div>
    </div>
  )
}

export default PickupOrderList
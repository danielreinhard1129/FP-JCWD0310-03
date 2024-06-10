'use client'
import Pagination from '@/components/Pagination'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useGetOrders from '@/hooks/api/order/useGetOrders'
import Link from 'next/link'
import { useState } from 'react'
import TableOrder from './components/TableOrder'

const MenuOrder = () => {
  const [page, setPage] = useState<number>(1);
  // const { id } = useAppSelector((state) => state.user);
  const { data: orders, meta, refetch } = useGetOrders({
    id: 0,
    page,
    take: 5,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className='flex flex-col gap-5 p-6'>
      <div className='flex justify-between my-auto'>
        <div>
          <h1 className='font-bold text-xl'>Your Orders</h1>
        </div>
        <Link href={"/dashboard-super-admin/menu-order/pickup-order-list"}>
          <div className='flex bg-mythemes-maingreen h-full w-40 rounded-lg'>
            <h1 className='text-white font-medium mx-auto my-auto'>Create Order</h1>
          </div>
        </Link>
      </div>
      <div>
        <Pagination
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        />
        <Table className='bg-mythemes-secondarygreen rounded-xl'>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Pickup Number</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => {
              return (
                <TableOrder
                  key={index}
                  orderId={order.id}
                  orderNumber={order.orderNumber}
                  pickupNumber={order.pickupOrder.pickupNumber}
                  weight={String(order.weight)}
                  price={String(order.laundryPrice)}
                  createdAt={String(order.createdAt)}
                  status={order.orderStatus}                  
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MenuOrder
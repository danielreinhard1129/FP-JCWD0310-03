'use client'
import Pagination from '@/components/Pagination'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useGetOrders from '@/hooks/api/order/useGetOrders'
import Link from 'next/link'
import { useState } from 'react'
import TableOrder from './components/TableOrder'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ItemFilterOutlet from './components/ItemFilterOutlet'
import ItemFilterStatus from './components/ItemFilterStatus'
import useGetOrderWorkers from '@/hooks/api/orderWorker/useGetOrderWorkers'
import { EmployeeStation } from '@/types/employee.type'
import TableBypassRequest from './components/TableBypaassRequest'

const MenuOrder = () => {
  const [page, setPage] = useState<number>(1);
  const [pageBypass, setPageBypass] = useState<number>(1);
  // const { id } = useAppSelector((state) => state.user);
  const id = 1
  const [filterOutlet, setFilterOutlet] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortOrder, setSortOrder] = useState('asc')

  const { data: orders, meta, refetch } = useGetOrders({
    id: id,
    page,
    take: 10,
    filterOutlet,
    filterStatus,
    sortOrder,
  });

  const { data: orderWorkers, meta: metaBypass, refetch: refetchBypass } = useGetOrderWorkers({
    id: id,
    page: pageBypass,
    take: 10,
    bypassRequest: Number(Boolean(true)),
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };
  const handleChangePaginateBypass = ({ selected }: { selected: number }) => {
    setPageBypass(selected + 1);
  };

  const handleChangeFilterOutlet = (value: string) => {
    setFilterOutlet(value)
  }
  const handleChangeFilterStatus = (value: string) => {
    setFilterStatus(value)
  }
  const handleChangeSortingBy = (value: 'asc' | 'desc') => {
    setSortOrder(value)
  }

  return (
    <div className='container flex flex-col gap-5 p-6'>
      <div className='flex justify-between'>
        <div>
          <h1 className='font-bold text-xl'>Your Orders</h1>
        </div>
        <div className='flex gap-2'>
          <Select name='outlet' onValueChange={handleChangeFilterOutlet} defaultValue='all'>
            <SelectTrigger className='min-w-40'>
              <SelectValue placeholder={"Outlet"} />
            </SelectTrigger>
            <ItemFilterOutlet />
          </Select>
          <Select name='status' onValueChange={handleChangeFilterStatus} defaultValue='all'>
            <SelectTrigger className='min-w-40'>
              <SelectValue placeholder={"Status"} />
            </SelectTrigger>
            <ItemFilterStatus />
          </Select>
          <Select name='sortOrder' onValueChange={handleChangeSortingBy} defaultValue='asc'>
            <SelectTrigger className='min-w-40'>
              <SelectValue placeholder={"Sort By"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='asc'>Sort by: Newest</SelectItem>
              <SelectItem value='desc'>Sort by: Latest</SelectItem>
            </SelectContent>
          </Select>
          <Link href={"/dashboard/master/order/pickup-order-list"}>
            <div className='flex bg-mythemes-maingreen h-full w-40 rounded-lg'>
              <h1 className='text-white font-medium mx-auto my-auto'>Create Order</h1>
            </div>
          </Link>
        </div>
      </div>
      <div>

        <Table className='text-xs bg-mythemes-secondarygreen/40 rounded-xl text-stone-800'>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Pickup Number</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead></TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order, index) => {
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
        <Pagination
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        />
      </div>
      <div>
        <h1 className='font-bold text-lg'>Bypass Request</h1>
      </div>
      <div>
        <Table className='text-xs bg-mythemes-secondarygreen/40 rounded-xl text-stone-800'>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Outlet</TableHead>
              <TableHead>Station</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderWorkers?.map((orderWorker, index) => {
              return (
                <TableBypassRequest
                  key={index}
                  orderWorkerId={orderWorker.id}
                  isAccept={orderWorker.bypassAccepted}
                  isReject={orderWorker.bypassRejected}
                  orderNumber={orderWorker.order.orderNumber}
                  weight={String(orderWorker.order.weight)}
                  price={String(orderWorker.order.laundryPrice)}
                  outlet={String(orderWorker.order.pickupOrder.outlet.outletName)}
                  station={String(orderWorker.station)}
                  refetch={refetchBypass}
                />
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          total={metaBypass?.total || 0}
          take={metaBypass?.take || 0}
          onChangePage={handleChangePaginateBypass}
        />
      </div>
    </div>
  )
}

export default MenuOrder
'use client'
import Pagination from '@/components/Pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminAuthGuard from '@/hoc/AdminAuthGuard';
import useGetDeliveryOrders from '@/hooks/api/deliveryOrder/useGetDeliveryOrders';
import useGetPickupOrders from '@/hooks/api/pickupOrder/useGetPickupOrders';
import { useAppSelector } from '@/redux/hooks';
import React, { useState } from 'react'

const Shipment = () => {
  const [page, setPage] = useState<number>(1);
  const { data: pickupOrders, meta, refetch } = useGetPickupOrders({
    page,
    take: 10,
    isClaimedbyDriver: Number(Boolean(true))
  }); 
  
  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className='container flex flex-col gap-5 pt-6 px-6'>
      <div className='flex justify-between my-auto'>
        <div>
          <h1 className="font-bold text-xl">Pickup Order Tracking</h1>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver Name</TableHead>
              <TableHead>Pickup Number</TableHead>
              <TableHead>Outlet</TableHead>
              <TableHead>Position</TableHead>              
            </TableRow>
          </TableHeader>
          <TableBody>
            {pickupOrders?.map((item, index) => {
              return (
                <TableRow key={index} >
                  <TableCell>{item.driver?.user.fullName}</TableCell>
                  <TableCell>{item.pickupNumber}</TableCell>
                  <TableCell>{item.outlet.outletName}</TableCell>
                  <TableCell>{item.pickupStatus}</TableCell>
                </TableRow>
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

export default AdminAuthGuard(Shipment)
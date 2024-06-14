'use client'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useGetDeliverProgresses from '@/hooks/api/deliverOrder/useGetDeliverProgresses';
import useGetPickupProgresses from '@/hooks/api/pickupOrder/useGetPickupProgresses';
import React, { useState } from 'react'
import TablePickupProgress from '../components/TablePickupProgress';
import Pagination from '@/components/Pagination';
import TableDeliverProgress from '../components/TableDeliverProgress';

const Progresses = () => {
  const [pagePickupProgress, setPagePickupProgress] = useState<number>(1);
  const [pageDeliverProgress, setPageDeliverProgress] = useState<number>(1);
  // const { id } = useAppSelector((state) => state.user);
  const id = 4;
  const { data: pickupProgresses, meta: metaPickupProgress, refetch: refetchPickupProgress } = useGetPickupProgresses({
    id: id,
    page: pagePickupProgress,
    take: 5,
  });
  const { data: deliverProgresses, meta: metaDeliverProgress, refetch: refetchDeliverProgress } = useGetDeliverProgresses({
    id: id,
    page: pageDeliverProgress,
    take: 5,
  });


  const handleChangePaginatePickupProgress = ({ selected }: { selected: number }) => {
    setPagePickupProgress(selected + 1);
  };
  const handleChangePaginateDeliverProgress = ({ selected }: { selected: number }) => {
    setPageDeliverProgress(selected + 1);
  };
  return (
    <div className='flex flex-col gap-5 p-6'>      
      <div className='flex justify-between my-auto'>
        <div>
          <h1 className='font-bold text-xl'>Your Pickup Progress</h1>
        </div>
      </div>
      <div>

        <Table className='text-xs bg-mythemes-secondarygreen rounded-xl'>
          <TableHeader>
            <TableRow>
              <TableHead>Ref. Number</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Outlet</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pickupProgresses.map((pickupProgress, index) => {
              return (
                <TablePickupProgress
                  key={index}
                  driverId={id}
                  pickupOrderId={pickupProgress.id}
                  pickupNumber={pickupProgress.pickupNumber}
                  name={pickupProgress.user.fullName}
                  address={pickupProgress.user.email}
                  outlet={pickupProgress.outlet.outletName}
                  status={pickupProgress.pickupStatus}
                  refetch={refetchPickupProgress}
                />
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          total={metaPickupProgress?.total || 0}
          take={metaPickupProgress?.take || 0}
          onChangePage={handleChangePaginatePickupProgress}
        />
      </div>
      <div className='flex justify-between my-auto'>
        <div>
          <h1 className='font-bold text-xl'>Your Deliver Progress</h1>
        </div>
      </div>
      <div>

        <Table className='text-xs bg-mythemes-secondarygreen rounded-xl'>
          <TableHeader>
            <TableRow>
              <TableHead>Ref. Number</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliverProgresses.map((deliverProgress, index) => {
              return (
                <TableDeliverProgress
                  key={index}
                  driverId={id}
                  deliverOrderId={deliverProgress.id}
                  deliverNumber={deliverProgress.deliverNumber}
                  name={deliverProgress.user.fullName}
                  address={deliverProgress.user.email}
                  status={deliverProgress.deliverStatus}
                  refetch={refetchDeliverProgress}
                />
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          total={metaDeliverProgress?.total || 0}
          take={metaDeliverProgress?.take || 0}
          onChangePage={handleChangePaginateDeliverProgress}
        />
      </div>
    </div>
  )
}

export default Progresses
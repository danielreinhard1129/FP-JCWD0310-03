'use client'
import Pagination from '@/components/Pagination';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useGetPickupRequest from '@/hooks/api/pickupOrder/useGetPickupRequest';
import useGetPickupProgresses from '@/hooks/api/pickupOrder/useGetPickupProgresses';
import { useState } from 'react';
import TablePickupProgress from './components/TablePickupProgress';
import TablePickupRequest from './components/TablePickupRequest';
import TableDeliverRequest from './components/TableDeliverRequest';
import useGetDeliverRequest from '@/hooks/api/deliverOrder/useGetDeliverRequest';
import useGetDeliverProgresses from '@/hooks/api/deliverOrder/useGetDeliverProgresses';
import TableDeliverProgress from './components/TableDeliverProgress';

const DashboardDriver = () => {
  const [pagePickupRequest, setPagePickupRequest] = useState<number>(1);
  const [pageDeliverRequest, setPageDeliverRequest] = useState<number>(1);
  const [pagePickupProgress, setPagePickupProgress] = useState<number>(1);
  const [pageDeliverProgress, setPageDeliverProgress] = useState<number>(1);
  // const { id } = useAppSelector((state) => state.user);
  const id = 4;
  const { data: pickupRequests, meta: metaPickupRequest, refetch: refetchPickupRequest } = useGetPickupRequest({
    id: id,
    page: pagePickupRequest,
    take: 5,
  });
  const { data: deliverRequests, meta: metaDeliverRequest, refetch: refetchDeliverRequest } = useGetDeliverRequest({
    id: id,
    page: pageDeliverRequest,
    take: 5,
  });
  const { data: pickupProgresses, meta: metaPickupProgress, refetch: refetchPickupProgress } = useGetPickupProgresses({
    id: id,
    page : pagePickupProgress,
    take: 5,
  });
  const { data: deliverProgresses, meta: metaDeliverProgress, refetch: refetchDeliverProgress } = useGetDeliverProgresses({
    id: id,
    page : pageDeliverProgress,
    take: 5,
  });

  const handleChangePaginatePickupRequest = ({ selected }: { selected: number }) => {
    setPagePickupRequest(selected + 1);
  };
  const handleChangePaginateDeliverRequest = ({ selected }: { selected: number }) => {
    setPageDeliverRequest(selected + 1);
  };
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
          <h1 className='font-bold text-xl'>Pickup Request</h1>
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
            {pickupRequests.map((pickupRequest, index) => {
              return (
                <TablePickupRequest
                  key={index}
                  driverId={id}
                  pickupOrderId={pickupRequest.id}
                  pickupNumber={pickupRequest.pickupNumber}
                  name={pickupRequest.user.fullName}
                  address={pickupRequest.user.email}
                  outlet={pickupRequest.outlet.outletName}
                  refetch1={refetchPickupRequest}
                  refetch2={refetchPickupProgress}
                />
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          total={metaPickupRequest?.total || 0}
          take={metaPickupRequest?.take || 0}
          onChangePage={handleChangePaginatePickupRequest}
        />
      </div>
      <div className='flex justify-between my-auto'>
        <div>
          <h1 className='font-bold text-xl'>Deliver Request</h1>
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
            {deliverRequests.map((deliverRequest, index) => {
              return (
                <TableDeliverRequest
                  key={index}
                  driverId={id}
                  deliverOrderId={deliverRequest.id}
                  deliverNumber={deliverRequest.deliverNumber}
                  name={deliverRequest.user.fullName}
                  address={deliverRequest.user.email}
                  refetch1={refetchDeliverRequest}
                  refetch2={refetchDeliverProgress}
                />
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          total={metaDeliverRequest?.total || 0}
          take={metaDeliverRequest?.take || 0}
          onChangePage={handleChangePaginateDeliverRequest}
        />
      </div>
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

export default DashboardDriver
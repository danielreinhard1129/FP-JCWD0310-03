'use client'
import Pagination from '@/components/Pagination';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useGetDeliverRequest from '@/hooks/api/deliverOrder/useGetDeliverRequest';
import useGetPickupRequest from '@/hooks/api/pickupOrder/useGetPickupRequest';
import { useState } from 'react';
import TableDeliverRequest from './components/TableDeliverRequest';
import TablePickupRequest from './components/TablePickupRequest';

const DashboardDriver = () => {
  const [pagePickupRequest, setPagePickupRequest] = useState<number>(1);
  const [pageDeliverRequest, setPageDeliverRequest] = useState<number>(1);
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

  const handleChangePaginatePickupRequest = ({ selected }: { selected: number }) => {
    setPagePickupRequest(selected + 1);
  };
  const handleChangePaginateDeliverRequest = ({ selected }: { selected: number }) => {
    setPageDeliverRequest(selected + 1);
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
                  refetch2={()=>{}}
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
                  refetch2={()=>{}}
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
    </div>
  )
}

export default DashboardDriver
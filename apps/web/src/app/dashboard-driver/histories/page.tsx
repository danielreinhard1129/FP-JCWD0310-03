'use client'
import Pagination from '@/components/Pagination';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useGetDeliverHistories from '@/hooks/api/deliverOrder/useGetDeliverHistories';
import useGetPickupHistories from '@/hooks/api/pickupOrder/useGetPickupHistories';
import { useState } from 'react';
import TableDeliverRequest from '../components/TableDeliverRequest';
import TableHistories from '../components/TableHistories';


const Histories = () => {
    const [pagePickupHistory, setPagePickupHistory] = useState<number>(1);
  const [pageDeliverHistory, setPageDeliverHistory] = useState<number>(1);
  // const { id } = useAppSelector((state) => state.user);
  const id = 4;
  const { data: pickupHistories, meta: metaPickupHistory, refetch: refetchPickupHistory } = useGetPickupHistories({
    id: id,
    page: pagePickupHistory,
    take: 5,
  });
  const { data: deliverHistories, meta: metaDeliverHistory, refetch: refetchDeliverHistory } = useGetDeliverHistories({
    id: id,
    page: pageDeliverHistory,
    take: 5,
  });
  

  const handleChangePaginatePickupHistory = ({ selected }: { selected: number }) => {
    setPagePickupHistory(selected + 1);
  };
  const handleChangePaginateDeliverHistory = ({ selected }: { selected: number }) => {
    setPageDeliverHistory(selected + 1);
  };
  
  return (
    <div className='flex flex-col gap-5 p-6'>
      <div className='flex justify-between my-auto'>
        <div>
          <h1 className='font-bold text-xl'>Pickup History</h1>
        </div>
      </div>
      <div>

        <Table className='text-xs bg-mythemes-secondarygreen rounded-xl'>
          <TableHeader>
            <TableRow>
              <TableHead>Ref. Number</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Outlet</TableHead>              
            </TableRow>
          </TableHeader>
          <TableBody>
            {pickupHistories.map((pickupHistory, index) => {
              return (
                <TableHistories
                  key={index}
                  refNumber={pickupHistory.pickupNumber}
                  name={pickupHistory.user.fullName}
                  email={pickupHistory.user.email}
                  status={pickupHistory.pickupStatus}                  
                />
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          total={metaPickupHistory?.total || 0}
          take={metaPickupHistory?.take || 0}
          onChangePage={handleChangePaginatePickupHistory}
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
              <TableHead>Email</TableHead>
              <TableHead>Outlet</TableHead>              
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliverHistories.map((deliverHistory, index) => {
              return (
                <TableHistories
                  key={index}
                  refNumber={deliverHistory.deliverNumber}
                  name={deliverHistory.user.fullName}
                  email={deliverHistory.user.email}
                  status={deliverHistory.deliverStatus}                  
                />
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          total={metaDeliverHistory?.total || 0}
          take={metaDeliverHistory?.take || 0}
          onChangePage={handleChangePaginateDeliverHistory}
        />
      </div>
    </div>
  )
}

export default Histories
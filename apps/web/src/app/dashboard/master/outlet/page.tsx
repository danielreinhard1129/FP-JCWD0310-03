'use client';

import Pagination from '@/components/Pagination';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useGetEmployees from '@/hooks/api/employee/useGetEmployees';
import Link from 'next/link';
import { useState } from 'react';
import TableOutlet from './components/TableOutlet';
import useGetOutletList from '@/hooks/api/outlet/useGetOutletsList';
import SuperAdminGuard from '@/hoc/SuperAdminGuard';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const MenuOutlet = () => {
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  // const { id } = useAppSelector((state) => state.user);
  const { data, meta, refetch } = useGetOutletList({
    take: 1000,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="flex justify-between my-auto">
        <div>
          <h1 className="font-bold text-xl">Your Outlet</h1>
        </div>
        {/* <Link href={'/dashboard/master/outlet/create-outlet'}> */}
        <Button
          variant="outline"
          onClick={() => {
            router.push('/dashboard/master/outlet/create-outlet');
          }}
          // onClick={() => setIsOpen(true)}
          className="font-bold text-mythemes-maingreen flex gap-2 text-md bg-inherit border-none"
        >
          <PlusCircle />
          Add item
        </Button>
        {/* </Link> */}
      </div>
      <div>
        <Table className="bg-white rounded-xl">
          <TableHeader>
            <TableRow className="font-extrabold">
              <TableHead>No.</TableHead>
              <TableHead>Outlet name</TableHead>
              <TableHead>Outlet type</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((outlet, index) => {
              return (
                <TableOutlet
                  key={index}
                  no={index + 1}
                  id={outlet.id}
                  name={outlet.outletName}
                  type={outlet.outletType}
                  address={{
                    addressLine: outlet.address[0]?.addressLine,
                    city: outlet.address[0]?.city,
                  }}
                  // city={outlet.address.city}
                />
              );
            })}
          </TableBody>
        </Table>
        {/* <Pagination
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        /> */}
      </div>
    </div>
  );
};

export default SuperAdminGuard(MenuOutlet);

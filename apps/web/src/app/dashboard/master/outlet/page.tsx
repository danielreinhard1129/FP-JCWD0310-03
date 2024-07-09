'use client';

import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SuperAdminGuard from '@/hoc/SuperAdminGuard';
import useGetOutletList from '@/hooks/api/outlet/useGetOutletsList';
import { debounce } from 'lodash';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import TableOutlet from './components/TableOutlet';

const MenuOutlet = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { data, meta, refetch } = useGetOutletList({
    page,
    take: 10,
    search,
    sortOrder: 'desc',
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const handleSearch = debounce((value: string) => {
    setSearch(value);
  }, 1500);

  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="flex flex-col justify-between my-auto">
        <div>
          <h1 className="font-bold text-xl ml-4">Your Outlet</h1>
        </div>
        <div className="w-full relative flex gap-12 p-4 items-center">
          <Input
            ref={inputRef}
            className="h-10"
            type="text"
            name="search"
            placeholder="Search Outlet Name"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
          <Button
            variant="outline"
            onClick={() => {
              router.push('/dashboard/master/outlet/create-outlet');
            }}
            className="font-bold text-mythemes-maingreen flex gap-2 text-md bg-inherit border-none"
          >
            <PlusCircle />
            Add item
          </Button>
        </div>
      </div>
      <div>
        <Table className="bg-white rounded-xl">
          <TableHeader>
            <TableRow className="font-extrabold">
              <TableHead className="text-black font-bold">
                Outlet name
              </TableHead>
              <TableHead className="text-black font-bold">
                Outlet type
              </TableHead>
              <TableHead className="text-black font-bold">Address</TableHead>
              <TableHead className="text-black font-bold">City</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((outlet, index) => {
              return (
                <TableOutlet
                  key={index}
                  id={outlet.id}
                  name={outlet.outletName}
                  type={outlet.outletType}
                  address={{
                    addressLine: outlet.address[0]?.addressLine,
                    city: outlet.address[0]?.city,
                  }}
                  refetch={refetch}
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
  );
};

export default SuperAdminGuard(MenuOutlet);

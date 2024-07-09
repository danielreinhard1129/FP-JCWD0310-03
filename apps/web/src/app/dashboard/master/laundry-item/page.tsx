'use client';

import Pagination from '@/components/Pagination';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SuperAdminGuard from '@/hoc/SuperAdminGuard';
import useGetLaundryItemList from '@/hooks/api/laundryItem/useGetLaundryItemList';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';
import AddItem from './components/AddItem';
import TableLaundryItem from './components/TableLaundryItem';

const LaundryItem = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, refetch, meta, isLoading } = useGetLaundryItemList({
    isDelete: Number(Boolean(false)),
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
          <h1 className="font-bold text-xl">Laundry item</h1>
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
          <AddItem refetch={refetch} />
        </div>
      </div>
      <div>
        <Table className="bg-white mx-auto rounded-xl">
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="font-bold text-black">No.</TableHead>
              <TableHead className="font-bold text-black">Item name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableLaundryItem
                  key={index}
                  no={index + 1}
                  id={item.id}
                  itemName={item.itemName.toUpperCase()}
                  isLoading={isLoading}
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

export default SuperAdminGuard(LaundryItem);

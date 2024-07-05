'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SuperAdminGuard from '@/hoc/SuperAdminGuard';
import useGetLaundryItemList from '@/hooks/api/laundryItem/useGetLaundryItemList';

import TableLaundryItem from './components/TableLaundryItem';
import AddItem from './components/AddItem';

const LaundryItem = () => {
  const { isData, refetch, isLoading } = useGetLaundryItemList();

  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="flex justify-between my-auto">
        <div>
          <h1 className="font-bold text-xl">Laundry item</h1>
        </div>
        <AddItem refetch={refetch} />
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
            {isData.map((item, index) => {
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
      </div>
    </div>
  );
};

export default SuperAdminGuard(LaundryItem);

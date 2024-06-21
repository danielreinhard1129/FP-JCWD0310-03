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
import { AddItem } from './components/AddItem';
import TableLaundryItem from './components/TableLaundryItem';

const LaundryItem = () => {
  const { isData, refetch, isLoading } = useGetLaundryItemList();

  // useEffect(() => {
  //   refetch();
  //   console.log('jalan sekali');
  // }, [isLoading]);

  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="flex justify-between my-auto">
        <div>
          <h1 className="font-bold text-xl">Laundry item</h1>
        </div>
        <AddItem refetch={async () => await refetch()} />
      </div>
      <div>
        <Table className="bg-white mx-auto w-[700px] rounded-xl text-center">
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="font-bold text-center">No.</TableHead>
              <TableHead className="font-bold text-center">Item name</TableHead>
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

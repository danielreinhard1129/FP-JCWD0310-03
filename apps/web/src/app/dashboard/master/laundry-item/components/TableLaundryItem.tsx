'use client';
import { TableCell, TableRow } from '@/components/ui/table';
import { SquarePen, Trash2 } from 'lucide-react';
import { FC } from 'react';
import { UpdateItem } from './UpdateItem';
import { DeleteItem } from './DeleteItem';

interface LaundryItemProps {
  id: number;
  itemName: string;
  no: number;
  isLoading: boolean;
  refetch: () => void;
}
const TableLaundryItem: FC<LaundryItemProps> = ({
  id,
  itemName,
  no,
  isLoading,
  refetch,
}) => {
  return (
    <TableRow className='text-sm'>
      <TableCell>{no}</TableCell>
      <TableCell>{itemName}</TableCell>
      <TableCell className="flex gap-6 place-content-end">
        <UpdateItem id={id} refetch={refetch} isLoading={isLoading} />
        <DeleteItem id={id} refetch={refetch} />
      </TableCell>
    </TableRow>
  );
};
export default TableLaundryItem;

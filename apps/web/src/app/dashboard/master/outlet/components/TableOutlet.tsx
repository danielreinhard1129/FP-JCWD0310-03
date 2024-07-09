'use client';
import { TableCell, TableRow } from '@/components/ui/table';
import { SquarePen } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
interface OutletRowProps {
  id: number;
  key: number;
  name: string;
  type: string;
  address?: {
    addressLine: string;
    city: string;
  };
  refetch: () => void;
}

const TableOutlet: FC<OutletRowProps> = ({
  id,
  name,
  type,
  address,
  refetch,
}) => {
  return (
    <TableRow className="text-sm">
      <TableCell>{name}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{address && address.addressLine}</TableCell>
      <TableCell>{address && address.city}</TableCell>
      <TableCell>
        <Link href={`/dashboard/master/outlet/${id}`}>
          <SquarePen />
        </Link>
      </TableCell>
    </TableRow>
  );
};
export default TableOutlet;

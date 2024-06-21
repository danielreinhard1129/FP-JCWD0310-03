'use client';
import { TableCell, TableRow } from '@/components/ui/table';
import { SquarePen } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

// interface Address {
//   addressLine: string;
//   city: string;
// }
interface OutletRowProps {
  id: number;
  key: number;
  name: string;
  type: string;
  address?: {
    addressLine: string;
    city: string;
  };
  no: number;
}

const TableOutlet: FC<OutletRowProps> = ({
  key,
  id,
  name,
  type,
  address,
  no,
}) => {
  return (
    <TableRow >
      <TableCell>{no}</TableCell>
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

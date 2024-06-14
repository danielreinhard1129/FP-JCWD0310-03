'use client'
import { TableCell, TableRow } from '@/components/ui/table';
import { FC } from 'react';

interface HistoriesRowTableProps {
    key: number;
    refNumber: string
    name: string
    status: string | undefined
    email: string
}

const TableHistories: FC<HistoriesRowTableProps> = ({
    key,
    refNumber,
    name,
    email,
    status,
}) => {
    return (
        <TableRow key={key} >
            <TableCell>{refNumber}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{status}</TableCell>                   
        </TableRow>
    )
}
export default TableHistories
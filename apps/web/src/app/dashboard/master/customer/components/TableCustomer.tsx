'use client'
import { TableCell, TableRow } from '@/components/ui/table';
import { FC } from 'react';

interface CustomerRowTableProps {
    key: number;
    userId: number;
    name: string
    email: string
    role: string
    createdAt: string
}

const TableCustomers: FC<CustomerRowTableProps> = ({
    key,
    userId,
    name,
    email,
    role,
    createdAt   

}) => {
    return (
        <TableRow key={key} >
            <TableCell>{name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{role}</TableCell>
            <TableCell>{createdAt}</TableCell>            
        </TableRow>
    )
}
export default TableCustomers
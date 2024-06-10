import { TableCell, TableRow } from '@/components/ui/table';
import { FC } from 'react';

interface EmployeeRowTableProps {
    key: number;
    transactionId: number;
    username: string
    title: string
    quantity: number
    price: number
    amount: number
    status: string
}

const TableEmployees: FC<EmployeeRowTableProps> = ({
    key,
    title,
    amount,
    price,
    quantity,
    status,
    transactionId,
    username,
}) => {
    return (
        <TableRow key={key} >
            <TableCell>{title}</TableCell>
            <TableCell>{amount}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{transactionId}</TableCell>
            <TableCell>{username}</TableCell>
        </TableRow>
    )
}
export default TableEmployees
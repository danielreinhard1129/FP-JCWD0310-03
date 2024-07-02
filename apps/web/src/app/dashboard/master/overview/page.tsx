'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import SuperAdminGuard from '@/hoc/SuperAdminGuard';
import useGetPaymentChart from '@/hooks/api/payment/useGetPaymentReportChart';
import { format, getDaysInMonth } from 'date-fns';
import { useState } from 'react';
import ItemFilterOutlet from '../order/components/ItemFilterOutlet';
import ChartEvents from './components/ChartEvents';

const Overview = () => {
  // const { id } = useAppSelector((state) => state.user);
  const [filterOutlet, setFilterOutlet] = useState("all")
  const now = new Date();
  const [filterMonth, setFilterMonth] = useState(`${now.getMonth()}`)
  const [filterYear, setFilterYear] = useState('2024')

  const { data, isLoading, meta, refetch } = useGetPaymentChart({
    filterMonth,
    filterOutlet,
    filterYear,
  })

  const month = filterMonth ? Number(filterMonth) - 1 : now.getMonth();
  const year = filterYear ? Number(filterYear) : now.getFullYear();

  function getDaysInSpecificMonth(year: number, month: number): number {
    const date = new Date(year, month);
    return getDaysInMonth(date);
  }
  const daysInMonth = getDaysInSpecificMonth(year, month)

  const handleChangeFilterOutlet = (value: string) => {
    setFilterOutlet(value)
  }
  const handleChangeFilterMonth = (value: string) => {
    setFilterMonth(value)
  }
  const handleChangeFilterYear = (value: 'asc' | 'desc') => {
    setFilterYear(value)
  }


  return (
    <div className='container flex flex-col gap-5 p-6'>
      <div className='flex justify-between'>
        <div>
          <h1 className='font-bold text-xl'>Your Transaction</h1>
        </div>
        <div className='flex gap-2'>
          <Select name='outlet' onValueChange={handleChangeFilterOutlet} defaultValue='all'>
            <SelectTrigger className='min-w-40'>
              <SelectValue placeholder={"Outlet"} />
            </SelectTrigger>
            <ItemFilterOutlet />
          </Select>
          <Select name='month' onValueChange={handleChangeFilterMonth} defaultValue={`${now.getMonth()}`}>
            <SelectTrigger className='min-w-40'>
              <SelectValue placeholder={"Month"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1'>January</SelectItem>
              <SelectItem value='2'>February</SelectItem>
              <SelectItem value='3'>March</SelectItem>
              <SelectItem value='4'>April</SelectItem>
              <SelectItem value='5'>May</SelectItem>
              <SelectItem value='6'>June</SelectItem>
              <SelectItem value='7'>July</SelectItem>
              <SelectItem value='8'>Agust</SelectItem>
              <SelectItem value='9'>September</SelectItem>
              <SelectItem value='10'>Oktober</SelectItem>
              <SelectItem value='11'>November</SelectItem>
              <SelectItem value='12'>Desember</SelectItem>
            </SelectContent>
          </Select>
          <Select name='sortYear' onValueChange={handleChangeFilterYear} defaultValue='2024'>
            <SelectTrigger className='min-w-40'>
              <SelectValue placeholder={"Sort By"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='2024'>2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex gap-5'>
        <div className='p-6 w-1/3 bg-mythemes-secondaryblue/25 rounded-3xl'>
          <p className='text-2xl text-gray-500'>Total Volume</p>
          <p className='text-4xl font-semibold text-gray-700'>IDR {data?.totalIncome}</p>
        </div>
        <div className='p-6 w-1/3 bg-mythemes-secondaryblue/25 rounded-3xl'>
          <p className='text-2xl text-gray-500'>Total Transaction</p>
          <p className='text-4xl font-semibold text-gray-700'>{data?.totalTransaction}</p>
        </div>
        <div className='p-6 w-1/3 bg-mythemes-secondaryblue/25 rounded-3xl'>
          <p className='text-2xl text-gray-500'>Total Weight</p>
          <p className='text-4xl font-semibold text-gray-700'>{data?.totalWeight} kg</p>
        </div>
      </div>
      <div className='flex gap-5'>
        <div className='w-1/2 p-6 bg-mythemes-secondaryblue/25 rounded-3xl'>
          <ChartEvents
            dataSet={data?.incomeDaily}
            daysInMonth = {daysInMonth}
            label='Income'
            title='Daily Income'
          />
        </div>
        <div className='w-1/2 p-6 bg-mythemes-secondaryblue/25 rounded-3xl'>
          <ChartEvents
            dataSet={data?.incomeMonthly}
            label='Income'
            title='Monthly Income'
          />
        </div>
      </div>
      <div className='flex gap-5'>
        <div className='w-1/2 p-6 bg-mythemes-secondaryblue/25 rounded-3xl'>
          <ChartEvents
            dataSet={data?.transactionDaily}
            daysInMonth = {daysInMonth}
            label='Transaction'
            title='Daily Transaction'
          />
        </div>
        <div className='w-1/2 p-6 bg-mythemes-secondaryblue/25 rounded-3xl'>
          <ChartEvents
            dataSet={data?.transactionMonthly}
            label='transaction'
            title='Monthly Transaction'
          />
        </div>
      </div>
      <div className='flex gap-5'>
        <div className='w-1/2 p-6 bg-mythemes-secondaryblue/25 rounded-3xl'>
          <ChartEvents
            dataSet={data?.weightDaily}
            daysInMonth = {daysInMonth}
            label='Weight'
            title='Daily Weight'
          />
        </div>
        <div className='w-1/2 p-6 bg-mythemes-secondaryblue/25 rounded-3xl'>
          <ChartEvents
            dataSet={data?.weightMonthly}
            label='Weight'
            title='Monthly Weight'
          />
        </div>
      </div>
      <div className='rounded-sm flex shadow-md'>
      </div>
      <div className='flex justify-between my-auto'>
        <div>
          <h1 className="font-bold text-xl">Transactions</h1>
        </div>
      </div>
      <div>
        <Table className='text-xs bg-mythemes-secondarygreen/40 rounded-xl text-stone-800'>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice Number</TableHead>
              <TableHead>Order Number</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Satus</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.payments.map((item, index) => {
              const formattedDate = format(new Date(item.updatedAt), 'dd-MM-yyyy');
              return (
                <TableRow key={index} >
                  <TableCell>{item.order.orderNumber}</TableCell>
                  <TableCell>{item.invoiceNumber}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.paymentStatus}</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* <Pagination
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        /> */}
      </div>
    </div>
  );
}

export default SuperAdminGuard(Overview)
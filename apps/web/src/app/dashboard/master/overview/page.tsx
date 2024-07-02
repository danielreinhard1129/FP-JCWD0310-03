'use client'
import SuperAdminGuard from '@/hoc/SuperAdminGuard';
import ChartEvents from './components/ChartEvents';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppSelector } from '@/redux/hooks';
import { useState } from 'react';
import ItemFilterOutlet from '../order/components/ItemFilterOutlet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Pagination from '@/components/Pagination';

const Overview = () => {
  const { id } = useAppSelector((state) => state.user);
  const [filterOutlet, setFilterOutlet] = useState("all")
  const [filterMonth, setFilterMonth] = useState("january")
  const [filterYear, setFilterYear] = useState('2024')
  


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
          <Select name='month' onValueChange={handleChangeFilterMonth} defaultValue='january'>
            <SelectTrigger className='min-w-40'>
              <SelectValue placeholder={"Month"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='january'>January</SelectItem>
              <SelectItem value='february'>February</SelectItem>
              <SelectItem value='march'>March</SelectItem>
              <SelectItem value='april'>April</SelectItem>
              <SelectItem value='may'>May</SelectItem>
              <SelectItem value='june'>June</SelectItem>
              <SelectItem value='july'>July</SelectItem>
              <SelectItem value='agust'>Agust</SelectItem>
              <SelectItem value='september'>September</SelectItem>
              <SelectItem value='oktober'>Oktober</SelectItem>
              <SelectItem value='november'>November</SelectItem>
              <SelectItem value='desember'>Desember</SelectItem>
            </SelectContent>
          </Select>
          <Select name='sortYear' onValueChange={handleChangeFilterYear} defaultValue='2024'>
            <SelectTrigger className='min-w-40'>
              <SelectValue placeholder={"Sort By"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='2023'>2023</SelectItem>
              <SelectItem value='2024'>2024</SelectItem>
              <SelectItem value='2025'>2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='rounded-sm flex shadow-md'>
        <ChartEvents />
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
              <TableHead>Driver Name</TableHead>
              <TableHead>Pickup Number</TableHead>
              <TableHead>Outlet</TableHead>
              <TableHead>Position</TableHead>              
            </TableRow>
          </TableHeader>
          {/* <TableBody>
            {pickupOrders?.map((item, index) => {
              return (
                <TableRow key={index} >
                  <TableCell>{item.driver?.user.fullName}</TableCell>
                  <TableCell>{item.pickupNumber}</TableCell>
                  <TableCell>{item.outlet.outletName}</TableCell>
                  <TableCell>{item.pickupStatus}</TableCell>
                </TableRow>
              );
            })}
          </TableBody> */}
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
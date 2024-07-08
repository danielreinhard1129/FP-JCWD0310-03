'use client';

import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SuperAdminGuard from '@/hoc/SuperAdminGuard';
import useGetEmployees from '@/hooks/api/employee/useGetEmployees';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TableEmployees from './components/TableEmployee';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ItemFilterOutletWithDeleted from '../order/components/ItemFilterOutletWithDeleted';

const MenuEmployee = () => {
  const [page, setPage] = useState<number>(1);
  const [filterOutlet, setFilterOutlet] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const router = useRouter()
  const {
    data: employees,
    meta,
    refetch,
  } = useGetEmployees({
    page,
    filterOutlet,
    filterRole,
    take: 10,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const handleChangeFilterOutlet = (value: string) => {
    setFilterOutlet(value);
  };
  const handleChangeFilterRole = (value: string) => {
    setFilterRole(value);
  }

  return (
    <div className="container flex flex-col gap-5 pt-6 px-6">
      <div className="flex justify-between my-auto">
        <div>
          <h1 className="font-bold text-xl">Your Employees</h1>
        </div>
        <div className='flex gap-2'>
          <Select
            name="outlet"
            onValueChange={handleChangeFilterOutlet}
            defaultValue="all"
          >
            <SelectTrigger className="min-w-40">
              <SelectValue placeholder={'Outlet'} />
            </SelectTrigger>
            <ItemFilterOutletWithDeleted />
          </Select>
          <Select
            name="role"
            onValueChange={handleChangeFilterRole}
            defaultValue="all"
          >
            <SelectTrigger className="min-w-40">
              <SelectValue placeholder={'Role'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Role</SelectItem>
              <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              <SelectItem value="OUTLET_ADMIN">Outlet Admin</SelectItem>
              <SelectItem value="DRIVER">Driver</SelectItem>
              <SelectItem value="WORKER">Worker</SelectItem>
            </SelectContent>
          </Select>

          <Button
            className=' bg-mythemes-maingreen rounded-lg text-md px-6 text-white font-medium'
            onClick={() => router.push('/dashboard/master/employee/add-employee')}
          >
            <div className='flex gap-2'>
              <PlusCircle className='my-auto' />
              <p className='my-auto'>
                Add Employee
              </p>
            </div>
          </Button>
        </div>
      </div>
      <div>
        <Table className="bg-white rounded-xl ">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-black">Full Name</TableHead>
              <TableHead className="font-bold text-black">Email</TableHead>
              <TableHead className="font-bold text-black">Role</TableHead>
              <TableHead className="font-bold text-black">Outlet</TableHead>
              <TableHead className="font-bold text-black">Work Shift</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee, index) => {
              return (
                <TableEmployees
                  key={index}
                  employeeId={employee?.id}
                  name={employee.user.fullName}
                  email={employee.user.email}
                  outlet={employee.outlet?.outletName}
                  role={employee.user.role}
                  workShift={employee.workShift}
                  station={employee.station}
                  refetch={refetch}
                />
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        />
      </div>
    </div>
  );
};

export default SuperAdminGuard(MenuEmployee)

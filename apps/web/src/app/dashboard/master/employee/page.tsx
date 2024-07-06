'use client';

import Pagination from '@/components/Pagination';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useGetEmployees from '@/hooks/api/employee/useGetEmployees';
import Link from 'next/link';
import { useState } from 'react';
import TableEmployees from './components/TableEmployee';
import SuperAdminGuard from '@/hoc/SuperAdminGuard';
import { PlusCircle, Router } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const MenuEmployee = () => {
  const [page, setPage] = useState<number>(1);
  const router = useRouter()
  const {
    data: employees,
    meta,
    refetch,
  } = useGetEmployees({
    page,
    take: 10,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className="container flex flex-col gap-5 pt-6 px-6">
      <div className="flex justify-between my-auto">
        <div>
          <h1 className="font-bold text-xl">Your Employees</h1>
        </div>
        <Button
          className=' bg-mythemes-maingreen rounded-lg text-md px-6 text-white font-medium'
          onClick={() => router.push('/dashboard/master/employee/add-employee')}
        >
          <div className='flex gap-2'>
            <PlusCircle className='my-auto'/>
            <p className='my-auto'>
              Add Employee
            </p>
          </div>
        </Button>
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

export default SuperAdminGuard(MenuEmployee);

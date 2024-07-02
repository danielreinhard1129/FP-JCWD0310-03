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
import { useAppSelector } from '@/redux/hooks';

const MenuEmployee = () => {
  const [page, setPage] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user);
  const {
    data: employees,
    meta,
    refetch,
  } = useGetEmployees({
    id: id,
    page,
    take: 5,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className='container flex flex-col gap-5 pt-6 px-6'>
      <div className='flex justify-between my-auto'>
        <div>
          <h1 className="font-bold text-xl">Your Employees</h1>
        </div>
        <Link href={'/dashboard/master/employee/add-employee'}>
          <div className="flex bg-mythemes-maingreen h-full w-40 rounded-lg">
            <h1 className="text-white font-medium mx-auto my-auto">
              Add Employee
            </h1>
          </div>
        </Link>
      </div>
      <div>
        <Table className="bg-mythemes-secondarygreen rounded-xl">
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Outlet</TableHead>
              <TableHead>Work Shift</TableHead>
              <TableHead>Status</TableHead>
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
                  status={employee.workShift}
                  station={employee.station}
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

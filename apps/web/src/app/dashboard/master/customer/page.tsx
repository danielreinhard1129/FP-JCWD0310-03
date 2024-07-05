'use client';
import Pagination from '@/components/Pagination';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React, { useState } from 'react';
import TableCustomers from './components/TableCustomer';
import useGetUsers from '@/hooks/api/user/useGetUsers';
import SuperAdminGuard from '@/hoc/SuperAdminGuard';
import { useAppSelector } from '@/redux/hooks';
import { id_ID } from '@faker-js/faker';

const MenuCustomer = () => {
  const [page, setPage] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user);
  const {
    data: users,
    meta,
    refetch,
  } = useGetUsers({
    // id: id,
    page,
    take: 10,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };
  return (
    <div className="container flex flex-col gap-5 pt-6 px-6">
      <div>
        <h1 className="font-bold text-xl">Customers</h1>
      </div>
      <div>
        <Table className=" rounded-xl">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-black">Full Name</TableHead>
              <TableHead className="font-bold text-black">Email</TableHead>
              <TableHead className="font-bold text-black">Role</TableHead>
              <TableHead className="font-bold text-black">
                Created Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => {
              const options:Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
              return (
                <TableCustomers
                  key={index}
                  userId={user.id}
                  name={user.fullName}
                  email={user.email}
                  role={user.role}
                  createdAt={String(
                    new Date(user.createdAt).toLocaleDateString('en-US',options),
                  )}
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

export default SuperAdminGuard(MenuCustomer);

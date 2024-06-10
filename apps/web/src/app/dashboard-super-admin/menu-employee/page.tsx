import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SquarePen } from 'lucide-react';
import Link from 'next/link';

const MenuEmployee = () => {
  

  // const { data: employees, meta, refetch } = useGetEmployees({
  //   id: id,
  //   page,
  //   take: 10,
  //   status: "PENDING" 
  // });

  return (
    <div className='flex flex-col gap-5 p-6'>
      <div className='flex justify-between my-auto'>
        <div>
          <h1 className='font-bold text-xl'>Your Employees</h1>
        </div>
        <Link href={"/dashboard-super-admin/add-employee"}>
          <div className='flex bg-mythemes-maingreen h-full w-40 rounded-lg'>
            <h1 className='text-white font-medium mx-auto my-auto'>Add Employee</h1>
          </div>
        </Link>
      </div>
      <div>
        <Table className='bg-mythemes-secondarygreen rounded-xl'>
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
            <TableRow >
              <TableCell>SJFSD</TableCell>
              <TableCell>ARGHEKRF</TableCell>
              <TableCell>RJKGNER</TableCell>
              <TableCell>QWEFNQK</TableCell>
              <TableCell>QEWFJQEF</TableCell>
              <TableCell>EWFNSDFJND</TableCell>
              <TableCell><SquarePen/></TableCell>
            </TableRow>
            <TableRow >
              <TableCell>SJFSD</TableCell>
              <TableCell>ARGHEKRF</TableCell>
              <TableCell>RJKGNER</TableCell>
              <TableCell>QWEFNQK</TableCell>
              <TableCell>QEWFJQEF</TableCell>
              <TableCell>EWFNSDFJND</TableCell>
              <TableCell><SquarePen/></TableCell>
            </TableRow>
            <TableRow >
              <TableCell>SJFSD</TableCell>
              <TableCell>ARGHEKRF</TableCell>
              <TableCell>RJKGNER</TableCell>
              <TableCell>QWEFNQK</TableCell>
              <TableCell>QEWFJQEF</TableCell>
              <TableCell>EWFNSDFJND</TableCell>
              <TableCell><SquarePen/></TableCell>
            </TableRow>
            <TableRow >
              <TableCell>SJFSD</TableCell>
              <TableCell>ARGHEKRF</TableCell>
              <TableCell>RJKGNER</TableCell>
              <TableCell>QWEFNQK</TableCell>
              <TableCell>QEWFJQEF</TableCell>
              <TableCell>EWFNSDFJND</TableCell>
              <TableCell><SquarePen/></TableCell>
            </TableRow>
            <TableRow >
              <TableCell>SJFSD</TableCell>
              <TableCell>ARGHEKRF</TableCell>
              <TableCell>RJKGNER</TableCell>
              <TableCell>QWEFNQK</TableCell>
              <TableCell>QEWFJQEF</TableCell>
              <TableCell>EWFNSDFJND</TableCell>
              <TableCell><SquarePen/></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MenuEmployee
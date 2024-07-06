'use client'
import useGetEmployee from '@/hooks/api/employee/useGetEmployee';
import useUpdateEmployee from '@/hooks/api/employee/useUpdateEmployee';
import { getChangedValues } from '@/utils/getChangeValues';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import FormEditEmployee from './components/FormEditEmployee';
import SuperAdminGuard from '@/hoc/SuperAdminGuard';
import logo1 from '../../../../../../public/Black Friday Typography Instagram Post.png'
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

interface FormUpdateEmployee {
  fullName: string,
  email: string,
  role: string,
  outletId: string,
  station: string,
  workShift: string,
}

const EditEmployee = ({ params }: { params: { id: string } }) => {
  const { employee, isLoading: isLoadingGetEmployee } = useGetEmployee(Number(params.id));
  const { isLoading, updateEmployee } = useUpdateEmployee(Number(params.id));

  let OutletId

  if (employee?.outletId != null) {
    OutletId = `${employee?.outletId}`
  } else {
    OutletId = employee?.outletId
  }

  const initialValues = {
    fullName: employee?.user.fullName || '',
    email: employee?.user.email || '',
    role: employee?.user.role || '',
    outletId: OutletId || '',
    station: employee?.station || '',
    workShift: employee?.workShift || '',
  };

  if (isLoadingGetEmployee) {
    return (
      <div className="animate-pulse">
      <Image alt="logo" src={logo1} />
    </div>
    )
  }

  const onSubmit = (values: Partial<FormUpdateEmployee>) => {
    const payload = getChangedValues(values, initialValues);
    updateEmployee(payload);

  };

  return (
    <main className="flex flex-col">
      <div className="p-6 flex gap-2 my-auto ">
        <Link className="my-auto" href={"/dashboard/master/employee"}>
          <ChevronLeft />
        </Link>
        <h1 className="text-lg font-bold my-auto">Edit Employee Data</h1>
      </div>
      <Separator className="bg-black" />
      <div className="p-6 rounded-xl bg-white">
        <FormEditEmployee
          isLoading={isLoading}
          onSubmit={onSubmit}
          initialValues={initialValues}
        />
      </div>
    </main>
  );
};

export default SuperAdminGuard(EditEmployee);

'use client'
import useGetEmployee from '@/hooks/api/employee/useGetEmployee';
import useUpdateEmployee from '@/hooks/api/employee/useUpdateEmployee';
import { getChangedValues } from '@/utils/getChangeValues';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import FormEditEmployee from './components/FormEditEmployee';

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
      <div className=' container flex h-screen justify-center px-4 pt-24 text-4xl font-semibold'>
        Loading
      </div>
    )
  }

  const onSubmit = (values: Partial<FormUpdateEmployee>) => {
    const payload = getChangedValues(values, initialValues);
    updateEmployee(payload);
    console.log(payload);

  };

  return (
    <main className="flex flex-col">
      <div className="p-6 flex gap-2 my-auto ">
        <Link className="my-auto" href={"/dashboard/master/employee"}>
          <ChevronLeft />
        </Link>
        <h1 className="text-lg font-bold my-auto">Edit Employee Data</h1>
      </div>
      <div className="mx-8 mb-8 p-5 w-8/12 rounded-xl bg-mythemes-secondarygreen">
        <FormEditEmployee
          isLoading={isLoading}
          onSubmit={onSubmit}
          initialValues={initialValues}
        />
      </div>
    </main>
  );
};

export default EditEmployee;

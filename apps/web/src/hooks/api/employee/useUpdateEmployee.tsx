'use client';

// import { axiosInstance } from '@/lib/axios';
import { Employee } from '@/types/employee.type';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAxios from '../useAxios';

interface updateEmployeeArgs {
  workShift: string;
  station: string;
  outletId: string;
  fullName?: string;
  email?: string;
  role?: string;
}

const useUpdateEmployee = (employeeId: number) => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateEmployee = async (payload: any) => {
    setIsLoading(true);
    try {
      await axiosInstance.patch(`/employees/${employeeId}`, {
        ...payload,
      });
      router.push('/dashboard-super-admin/menu-employee');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { updateEmployee, isLoading };
};

export default useUpdateEmployee;

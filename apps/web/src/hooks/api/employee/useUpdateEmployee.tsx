'use client';

import { axiosInstance } from '@/lib/axios';
import { Employee } from '@/types/employee.type';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// interface updateEmployeeArgs
//     extends Pick<Employee, 'outletId' | 'station' | 'workShift'> {
//     fullName?: string;
//     email?: string;
//     role?: string;
// }
interface updateEmployeeArgs {
    workShift: string;
    station: string;
    outletId: string;
    fullName?: string;
    email?: string;
    role?: string;
}

const useUpdateEmployee = (employeeId: number) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateEmployee = async (payload: any) => {
        setIsLoading(true);
        try {
            // const { outletId, station, workShift, fullName, email, role } = payload;
            // console.log(outletId)
            // const updateEmployeeForm = new FormData();
            
            // if (outletId) updateEmployeeForm.append('outletId', String(outletId));
            // if (station) updateEmployeeForm.append('station', String(station));
            // if (workShift) updateEmployeeForm.append('workShift', String(workShift));
            // if (fullName) updateEmployeeForm.append('fullName', String(fullName));
            // if (email) updateEmployeeForm.append('email', String(email));
            // if (role) updateEmployeeForm.append('role', String(role));
            // console.log(payload);


            await axiosInstance.patch(`/employee/employee/${employeeId}`, {
                ...payload
            }
                // {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     },
                // }
            );

            router.push("/dashboard-super-admin/menu-employee");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { updateEmployee, isLoading };
};

export default useUpdateEmployee;
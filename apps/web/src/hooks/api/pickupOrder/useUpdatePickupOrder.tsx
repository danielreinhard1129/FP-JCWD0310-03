'use client';

// import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAxios from '../useAxios';

interface updatePickupOrderArgs {
    workShift: string;
    station: string;
    outletId: string;
    fullName?: string;
    email?: string;
    role?: string;
}

const useUpdatePickupOrder = (pickupOrderId: number) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { axiosInstance } = useAxios();

    const updatePickupOrder = async (payload: any) => {
        setIsLoading(true);
        try {
            
            await axiosInstance.patch(`/pickupOrder/${pickupOrderId}`, {
                ...payload
            });

            router.push("/dashboard-super-admin/menu-order");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { updatePickupOrder, isLoading };
};

export default useUpdatePickupOrder;
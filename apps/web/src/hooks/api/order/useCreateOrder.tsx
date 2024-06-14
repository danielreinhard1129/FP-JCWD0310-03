'use client';

import { toast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { cn } from '@/lib/utils';
import { Order } from '@/types/order.type';
import { AxiosError } from 'axios';

import { useRouter } from 'next/navigation';

interface CreateOrderArgs
    extends Pick<Order, 'weight' > {
    orderItem: []
    pickupNumber: string
}

const useCreateOrder = () => {
    const router = useRouter();
    const createOrder = async (payload: CreateOrderArgs) => {

        try {
            console.log(payload);        
            await axiosInstance.post('/orders', payload);
            router.push("/dashboard-super-admin/menu-order");
        } catch (error) {
            if (error instanceof AxiosError) {

                toast({
                    className: cn(
                        'top-0 right-0 flex fixed md:max-w-[420px] md:top-16 md:right-4 border-mythemes-darkpink text-mythemes-darkpink'
                    ),
                    variant: 'default',
                    title: error?.response?.data,
                })
            }
        }
    };
    return { createOrder };
};

export default useCreateOrder;
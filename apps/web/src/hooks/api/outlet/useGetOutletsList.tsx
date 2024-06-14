'use client';
// import { axiosInstance } from '@/lib/axios';
import { Outlet } from '@/types/outlet.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

const useGetOutletList = () => {
    const [data, setData] = useState<Outlet[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { axiosInstance } = useAxios();

    const getOutlet = async () => {
        try {
            const { data } = await axiosInstance.get(`/outlet/outletlist`);
            setData(data.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                // TODO : replace console.log with toast
                console.log(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getOutlet();
    }, []);
    return { data, isLoading, refetch: getOutlet };
};

export default useGetOutletList;
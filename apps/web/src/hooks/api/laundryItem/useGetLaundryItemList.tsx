'use client';
// import { axiosInstance } from '@/lib/axios';
import { LaundryItem } from '@/types/laundryItem.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

const useGetLaundryItemList = () => {
    const { axiosInstance } = useAxios();
    const [data, setData] = useState<LaundryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const GetLaundryItem = async () => {
        try {
            const { data } = await axiosInstance.get(`/laundryitem/laundryitemlist`);
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
        GetLaundryItem();
    }, []);
    return { data, isLoading, refetch: GetLaundryItem };
};

export default useGetLaundryItemList;
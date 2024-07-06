'use client';

import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { Outlet } from '@/types/outlet.type';

interface Component {
  latitude: string;
  longitude: string;
  addressLine: string;
  id: number;
  outletId: number;
}
interface Data {
  address: Component[];
  outletName: string;
  id: number;
}

interface OpenCageData {
  data: Data[];
}

const useGetOutletCoord = () => {
  const { axiosInstance } = useAxios();
  const [dataOutles, setDataOutlets] = useState<OpenCageData | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const getOutletCoord = async () => {
    const { data } = await axiosInstance.get('/outlets');

    setDataOutlets(data);
    try {
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getOutletCoord();
  }, []);
  return { dataOutles, isLoading };
};
export default useGetOutletCoord;

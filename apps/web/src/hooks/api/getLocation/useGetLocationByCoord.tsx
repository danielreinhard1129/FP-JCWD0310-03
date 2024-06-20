import useAxios from '@/hooks/api/useAxios';
import { useState } from 'react';

interface test {
    results:{
        components:any
    }[]
}

export default function useGetLocationByCoord() {
  const [data, setData] = useState<test>({
    results : []
  });
  const { axiosInstance } = useAxios();

  async function getLocation(latitude: any, longitude: any) {
    const { data } = await axiosInstance.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=dcf8f780a1ff4552bd9e345869f75e5e`,
    );
    console.log('ini hook', data);
    setData(data);
    return;
  }

  return { getLocation, data };
}

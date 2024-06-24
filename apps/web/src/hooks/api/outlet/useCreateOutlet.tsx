'use client';
import { Outlet } from '@/types/outlet.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useAxios from '../useAxios';

interface createOutletArgs {
  outletName: string;
  outletType: string;
  addressLine: string;
  city: string;
  latitude: string;
  longitude: string;
}

const useCreateOutlet = () => {
  //   const [isLoading, setIsloading] = useState(false);
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const createOutlet = async (payload: createOutletArgs) => {
    // setIsloading(true);
    try {
      const { outletName, outletType, addressLine, city } = payload;

      await axiosInstance.post<Outlet>('/outlets', payload);

      toast.success('Create outlet success !');
      router.push('/dashboard/master/outlet');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
      console.log(error);
    }
  };
  return { createOutlet };
};
export default useCreateOutlet;

'use client';

// import { axiosInstance } from '@/lib/axios';
import { cn } from '@/lib/utils';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import useAxios from '../useAxios';
import { toast } from 'sonner';

interface RegisterResponses {
  message: string;
  data: User;
}

interface RegisterArgs extends Pick<User, 'email'> {}

const useRegister = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const register = async (payload: RegisterArgs) => {
    try {
      const { data } = await axiosInstance.post<RegisterResponses>(
        '/auth/register',
        payload,
      );
      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        // FIXME = change alert to toast
        toast.error(error.response?.data);
      }
    }
  };

  return { register };
};

export default useRegister;

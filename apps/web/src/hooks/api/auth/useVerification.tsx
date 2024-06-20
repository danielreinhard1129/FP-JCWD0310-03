'use client';

// import { axiosInstance } from '@/lib/axios';
import { cn } from '@/lib/utils';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import useAxios from '../useAxios';
import { toast } from 'sonner';

interface VerificationResponses {
  message: string;
}

interface VerificationArgs extends Pick<User, 'password'> {}
const useVerification = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const verification = async (payload: VerificationArgs) => {
    try {
      await axiosInstance.post<VerificationResponses>(
        'auth/verification',
        payload,
      );

      toast.success('Your account has been verified, please log in!');
      router.push('/login');
    } catch (error) {
      if (error instanceof AxiosError) {
        // FIXME = change alert to toast
        toast.error(error.response?.data);
      }
    }
  };

  return { verification };
};

export default useVerification;

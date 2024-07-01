'use client';

// import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useAxios from '../useAxios';

interface VerificationResponses {
  message: string;
}

interface VerificationArgs {
  password: string | null;
  token: string | null;
}
const useVerification = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const verification = async (payload: VerificationArgs) => {
    try {
      console.log('ini payload', payload);
      await axiosInstance.post('auth/verification', payload, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      });

      toast.success('Your account has been verified, please log in!');
      router.push('/login');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.status === 401 &&
          error.response.data?.message === 'token expired'
        ) {
          // Handle token expired error here
          toast.error('Your token has expired. Resend verification email.');
          // Redirect or perform action to resend verification email
        } else {
          toast.error(error.response?.data.message || 'An error occurred.');
        }
      }
    }
  };

  return { verification };
};

export default useVerification;

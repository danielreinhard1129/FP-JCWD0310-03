'use client';

import { toast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { cn } from '@/lib/utils';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

interface VerificationResponses {
  message: string;
}

interface VerificationArgs extends Pick<User, 'password'> {
  token: string | null;
}
const useVerification = () => {
  const router = useRouter();
  const verification = async (payload: VerificationArgs) => {
    try {
      await axiosInstance.post<VerificationResponses>(
        'auth/verification',
        payload,
      );

      // console.log(payload);

      router.push('/login');
    } catch (error) {
      if (error instanceof AxiosError) {
        // FIXME = change alert to toast
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-16 md:right-4 border-mythemes-darkpink text-mythemes-darkpink',
          ),
          variant: 'default',
          title: error?.response?.data,
        });
      }
    }
  };

  return { verification };
};

export default useVerification;

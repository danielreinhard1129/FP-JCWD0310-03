'use client';

import useGetUser from '@/hooks/api/user/useGetUser';
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import logo1 from '../../public/Black Friday Typography Instagram Post.png';

export default function WorkerAuthGuard(Component: any) {
  return function IsAuth(props: any) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const { id, role } = useAppSelector((state) => state.user);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, []);

    useEffect(() => {
      if (!id && !isLoading) {
        toast.error('Please login to continue !');
        redirect('/login');
      }
      if (role !== 'WORKER' && role === 'CUSTOMER' && !isLoading) {
        toast.error("You don't have permission to access this page.");
        redirect('/user');
      }
      if (role !== 'WORKER' && role === 'OUTLET_ADMIN' && !isLoading) {
        toast.error("You don't have permission to access this page.");
        redirect('/dashboard/master');
      }
      if (role !== 'WORKER' && role === 'SUPER_ADMIN' && !isLoading) {
        toast.error("You don't have permission to access this page.");
        redirect('/dashboard/master');
      }
      if (role !== 'WORKER' && role === 'DRIVER' && !isLoading) {
        toast.error("You don't have permission to access this page.");
        redirect('/dashboard/driver');
      }
    }, [id, role, isLoading]);

    if (isLoading || !id) {
      return (
        <div className="animate-pulse">
          <Image alt="logo" src={logo1} />
        </div>
      );
    }

    return <Component {...props} />;
  };
}

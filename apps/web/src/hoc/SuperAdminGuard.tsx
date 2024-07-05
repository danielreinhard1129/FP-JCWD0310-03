'use client';

import useGetUser from '@/hooks/api/user/useGetUser';
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import logo1 from '../../public/Black Friday Typography Instagram Post.png';

export default function SuperAdminGuard(Component: any) {
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
      if (role !== 'SUPER_ADMIN' && role === 'CUSTOMER' && !isLoading) {
        toast.error("You don't have permission to access this page.");
        redirect('/user');
      }
      if (role !== 'SUPER_ADMIN' && role === 'OUTLET_ADMIN' && !isLoading) {
        toast.error("You don't have permission to access this page.");
        redirect('/dashboard/master');
      }
      if (role !== 'SUPER_ADMIN' && role === 'WORKER' && !isLoading) {
        toast.error("You don't have permission to access this page.");
        redirect('/dashboard/worker');
      }
      if (role !== 'SUPER_ADMIN' && role === 'DRIVER' && !isLoading) {
        toast.error("You don't have permission to access this page.");
        redirect('/dashboard/driver');
      }
    }, [id, role, isLoading]);

    if (isLoading || !id) {
      return (
        <div className="flex flex-col px-6 h-screen place-content-center items-center gap-4">
          <div className="animate-pulse">
            <Image alt="logo" src={logo1} />
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}

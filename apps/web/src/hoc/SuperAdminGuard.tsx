'use client';

import useGetUser from '@/hooks/api/user/useGetUser';
import { useAppSelector } from '@/redux/hooks';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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
        <h1 className="container flex h-screen justify-center px-4 text-4xl pt-24 font-extrabold">
          Loading...
        </h1>
      );
    }

    return <Component {...props} />;
  };
}

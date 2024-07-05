'use client';

import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import logo1 from '../../public/Black Friday Typography Instagram Post.png';

export default function AuthGuard(Component: any) {
  return function IsAuth(props: any) {
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useAppSelector((state) => state.user);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, []);

    useEffect(() => {
      if (!id && !isLoading) {
        redirect('/login');
      }
    }, [id, isLoading]);

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

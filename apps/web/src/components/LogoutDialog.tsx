'use client';
import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAppDispatch } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo1 from '../../public/Black Friday Typography Instagram Post.png';

const LogoutDialog = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    router.push('/');
    localStorage.removeItem('token');
    dispatch(logoutAction());
  };


//   const handleLogout = () => {
//     useEffect(() => {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 500);
//     }, []);

//     if (isLoading) {
//       return (
//         <div className="flex flex-col px-6 h-screen place-content-center items-center gap-4">
//           <div className="animate-pulse">
//             <Image alt="logo" src={logo1} />
//           </div>
//         </div>
//       );
//     }
//   };

  return (
    <AlertDialog>
      <AlertDialogTrigger className=" text-red-500 hover:bg-red-500 w-32 mx-auto p-1 font-bold hover:text-white text-lg rounded-xl">
        Logout
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => logout()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutDialog;

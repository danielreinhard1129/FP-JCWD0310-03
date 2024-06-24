'use client';
import { Button } from '@/components/ui/button';
import AuthGuard from '@/hoc/AuthGuard';
import useResendVerifEmail from '@/hooks/api/auth/useResendVerifEmail';
import useGetUser from '@/hooks/api/user/useGetUser';
import { useAppDispatch } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';

import { ChevronLeft, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { GoXCircleFill } from 'react-icons/go';
import { IoIosArrowForward } from 'react-icons/io';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { toast } from 'sonner';
import noPic from '../../../../../public/pictNotFound.jpeg';
import useVerification from '@/hooks/api/auth/useVerification';
import { BASE_API_URL } from '@/utils/config';

const Profile = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
  };

  const { user, isLoading } = useGetUser(Number(params.id));

  const { resendVerifEmail } = useResendVerifEmail();

  const router = useRouter();

  let tokenExpiryDate;

  if (user?.tokenExpiresIn) {
    tokenExpiryDate = new Date(user.tokenExpiresIn);
  }

  const now = new Date();

  const capitalizeFirstLetter = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    if (user?.isVerify === false) {
      toast.warning('Please verify your account');
    }
  }, [user?.isVerify]);

  if (isLoading) {
    return (
      // <div className=" container flex h-screen justify-center px-4 pt-24 text-4xl font-semibold">
      <div className=" container flex justify-center px-4 pt-24 text-4xl font-semibold">
        Loading
      </div>
    );
  }

  return (
    // <main className="container p-0 pt-[32px] h-screen bg-[#ffff]">
    <main className="container p-0 pt-[32px] bg-[#ffff]">
      <div className=" px-6 flex flex-col gap-4  ">
        <div className="flex relative ">
          <ChevronLeft className="absolute" onClick={() => router.back()} />
          <h1 className=" font-extrabold mx-auto">My profile</h1>
        </div>

        {/* Profile */}
        <div className=" flex flex-row text-black rounded-xl p-2  gap-2 shadow-lg">
          <div className="w-20 h-20 rounded-full border-2 my-auto justify-center relative overflow-hidden mx-auto ">
            <Image
              alt="ProfilePict"
              src={
                user?.profilePic
                  ? user.profilePic.includes('googleusercontent.com')
                    ? user.profilePic
                    : `${BASE_API_URL}/assets${user.profilePic}`
                  : noPic.src // Path to your default image
              }
              quality={80}
              objectFit="cover"
              fill
              loading="lazy"
              className="mx-auto"
            />
          </div>
          <div className="flex-flex-col">
            <h1 className="text-left font-bold text-lg">
              {user?.fullName && capitalizeFirstLetter(user.fullName)}
            </h1>
            <p className="text-left text-sm w-56 mb-1">
              {user?.email || 'Your Email'}
            </p>
            <div>
              {user && user.isVerify === true ? (
                <p className="flex flex-row my-auto items-center text-sm gap-1 text-green-500 font-bold">
                  <RiVerifiedBadgeFill /> Verified
                </p>
              ) : tokenExpiryDate && tokenExpiryDate < now ? (
                <div className="relative flex flex-col">
                  <p className="flex flex-row my-auto items-center text-sm gap-1 text-red-500 font-bold">
                    <GoXCircleFill />
                    Unverified
                  </p>

                  <p className="text-xs text-red-500 font-light text-left w-52">
                    Your verification link is expired. <br />
                    <span
                      className="underline hover:text-red-800 font-bold cursor-pointer"
                      onClick={() => {
                        resendVerifEmail();
                      }}
                    >
                      Click here
                    </span>{' '}
                    to resend it.
                  </p>
                </div>
              ) : (
                <div className="relative flex flex-col">
                  <p className="flex flex-row my-auto items-center text-sm gap-1 text-red-500 font-bold">
                    <GoXCircleFill />
                    Unverified
                  </p>

                  <p className="text-xs text-red-500 font-light text-left w-52 ">
                    <span
                      className="underline hover:text-red-800 cursor-pointer"
                      onClick={() => router.push('/verification')}
                      // onClick={() => {
                      //   verification((params.id));
                      // }}
                    >
                      Click here
                    </span>{' '}
                    to verify.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 h-[569px]">
          <Button
            className="bg-mythemes-secondarygreen hover:bg-mythemes-maingreen hover:text-white text-black flex flex-row justify-between rounded-full"
            onClick={() => router.push(`/profile/${user?.id}/edit`)}
          >
            <p>Edit Profile</p>
            <IoIosArrowForward />
          </Button>
          <Button
            className="bg-mythemes-secondarygreen hover:bg-mythemes-maingreen hover:text-white text-black flex flex-row justify-between rounded-full"
            onClick={() => router.push(`/profile/${user?.id}/change-password`)}
          >
            <p>Change Password</p>
            <IoIosArrowForward />
          </Button>
          <Button
            className="bg-mythemes-secondarygreen  hover:bg-mythemes-maingreen hover:text-white text-black flex flex-row justify-between rounded-full"
            onClick={() => router.push(`/profile/${user?.id}/address`)}
          >
            <p>Your Address</p>
            <IoIosArrowForward />
          </Button>
          <Button
            onClick={logout}
            className="bg-mythemes-grey mt-auto text-red-500 hover:bg-mythemes-grey gap-2  flex flex-row justify-center rounded-full"
          >
            <LogOut />
            <p>Logout</p>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default AuthGuard(Profile);

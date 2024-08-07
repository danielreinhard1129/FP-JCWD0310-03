'use client';
import LogoutDialog from '@/components/LogoutDialog';
import { Button } from '@/components/ui/button';
import AuthGuard from '@/hoc/AuthGuard';
import useResendVerifEmail from '@/hooks/api/auth/useResendVerifEmail';
import useGetUser from '@/hooks/api/user/useGetUser';
import { useAppSelector } from '@/redux/hooks';
import { Role } from '@/types/user.type';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoXCircleFill } from 'react-icons/go';
import { IoIosArrowForward } from 'react-icons/io';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { toast } from 'sonner';
import noPic from '../../../../public/pictNotFound.jpeg';
import SkeletonProfile from '../components/SkeletonProfile';
import { BASE_API_URL } from '@/utils/config';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { email, fullName, role, tokenExpiresIn, isVerify, profilePic } =
    useAppSelector((state) => state.user);
  const { user } = useGetUser();
  const { resendVerifEmail } = useResendVerifEmail();
  const router = useRouter();

  let tokenExpiryDate;

  if (tokenExpiresIn) {
    tokenExpiryDate = new Date(tokenExpiresIn);
  }

  const now = new Date();

  const capitalizeFirstLetter = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    if (isVerify === false) {
      toast.warning('Please verify your account');
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <SkeletonProfile />;
  }
  return (
    <main className="container py-[32px] pb-20 p-0 flex flex-col h-screen">
      <div className=" px-6 flex flex-col gap-10 flex-grow  ">
        <div className="flex relative ">
          <ChevronLeft className="absolute" onClick={() => router.back()} />
          <h1 className=" font-extrabold mx-auto">My profile</h1>
        </div>

        {/* Profile */}
        <div className=" flex flex-row text-black rounded-xl p-2 gap-2 shadow-lg border-b-8 border-mythemes-maingreen bg-[#fffffe]">
          <div className="w-20 h-20 rounded-full border-2 my-auto justify-center relative overflow-hidden mx-auto ">
            <Image
              alt="ProfilePict"
              src={
                profilePic
                  ? profilePic.includes('googleusercontent.com')
                    ? profilePic
                    : `${BASE_API_URL}/assets${profilePic}`
                  : noPic.src
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
              {fullName && capitalizeFirstLetter(fullName)}
            </h1>
            <p className="text-left text-sm w-56 mb-1">
              {email || 'Your Email'}
            </p>
            <div>
              {isVerify === true ? (
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
                    Please check your email to verify your account.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <Button
            className="bg-mythemes-white hover:bg-mythemes-maingreen hover:text-white text-black flex flex-row justify-between border-mythemes-mainYellow border-b-2"
            onClick={() => router.push(`/user/profile/edit`)}
          >
            <p>Edit Profile</p>
            <IoIosArrowForward />
          </Button>
          {user?.password == null ? null : (
            <Button
              className="bg-mythemes-white hover:bg-mythemes-maingreen hover:text-white text-black flex flex-row justify-between border-mythemes-mainYellow border-b-2 "
              onClick={() => router.push(`/user/profile/change-password`)}
            >
              <p>Change Password</p>
              <IoIosArrowForward />
            </Button>
          )}

          <Button
            className={`${role !== Role.CUSTOMER ? `hidden` : `block`} bg-mythemes-white  hover:bg-mythemes-maingreen hover:text-white text-black border-mythemes-mainYellow border-b-2 `}
            onClick={() => router.push(`/user/order`)}
          >
            <div className="flex flex-row justify-between">
              <p>Your Order</p>
              <IoIosArrowForward />
            </div>
          </Button>
          <Button
            className={`${role !== Role.CUSTOMER ? `hidden` : `block`} bg-mythemes-white  hover:bg-mythemes-maingreen hover:text-white text-black border-mythemes-mainYellow border-b-2`}
            onClick={() => router.push('/user/profile/address')}
          >
            <div className="flex flex-row justify-between">
              <p>Your Address</p>
              <IoIosArrowForward />
            </div>
          </Button>
        </div>
        <div className="mx-auto mt-auto">
          <LogoutDialog />
        </div>
      </div>
    </main>
  );
};

export default AuthGuard(Profile);

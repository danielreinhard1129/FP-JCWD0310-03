'use client';
import { useAppSelector } from '@/redux/hooks';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import useGetUser from '@/hooks/api/user/useGetUser';

import ResendVerifEmail from '@/app/(auth)/resend-verif-email/page';
import { Badge } from '@/components/ui/badge';
import AuthGuard from '@/hoc/AuthGuard';
import { appConfig } from '@/utils/config';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import noPic from '../../../../../public/pictNotFound.jpeg';

const Profile = ({ params }: { params: { id: string } }) => {
  const [selectedImage, setSelectedImage] = useState<HTMLInputElement>();
  const inputRef = useRef();

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  const router = useRouter();

  const { isVerify, tokenExpiresIn, id } = useAppSelector(
    (state) => state.user,
  );
  const { user, isLoading } = useGetUser(Number(params.id));

  console.log('ini data dari page', user);

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
  }, [isVerify]);

  if (isLoading) {
    return (
      <div className=" container flex h-screen justify-center px-4 pt-24 text-4xl font-semibold">
        Loading
      </div>
    );
  }

  return (
    <main className="container p-0 py-6 bg-mythemes-maingreen left-0 right-0 z-50">
      <div>
        <div className="container">
          <div>back</div>
        </div>

        {/* Profile */}
        <div className="container flex flex-col text-white">
          <div className="w-24 h-24 rounded-full place-content-center relative overflow-hidden mx-auto ">
            <Image
              alt="ProfilePict"
              src={
                user?.profilePic
                  ? user.profilePic.includes('googleusercontent.com')
                    ? user.profilePic
                    : `${appConfig.baseURL}/assets/${user.profilePic}`
                  : `${noPic}` // Path to your default image
              }
              quality={80}
              objectFit="cover"
              fill
              loading="lazy"
              className="mx-auto"
            />
          </div>
          <h1 className="text-center font-bold text-xl">
            {/* {user?.fullName.toUpperCase()} */}
            {user?.fullName && capitalizeFirstLetter(user.fullName)}
          </h1>
          <p className="text-center font-extralight text-sm w-56 mx-auto mb-1">
            {user?.Address?.address || 'Your Address'}
          </p>
          {/* <div className=""> */}
          {isVerify === true ? (
            <Badge className="bg-green-200 text-green-700 mx-auto">
              Verified
            </Badge>
          ) : tokenExpiryDate && tokenExpiryDate < now ? (
            <div className="relative flex flex-col">
              <Badge variant={'destructive'} className="mx-auto">
                Unverified
              </Badge>

              <p className="text-xs text-red-500 font-light text-center w-52 mx-auto">
                Your verificationlink expired. <br />
                <span
                  className="underline hover:text-white cursor-pointer"
                  onClick={() => {
                    ResendVerifEmail();
                  }}
                >
                  Click here
                </span>{' '}
                to resend it.
              </p>
            </div>
          ) : (
            <div className="relative flex flex-col">
              <Badge variant={'destructive'} className="mx-auto">
                Unverified
              </Badge>

              <p className="text-xs text-red-500 font-light text-center w-52 mx-auto">
                <span
                  className="underline hover:text-white cursor-pointer"
                  onClick={() => router.push('/verification')}
                >
                  Click here
                </span>{' '}
                to verify.
              </p>
            </div>
            // <Button
            //   className="text-red-500"
            //   onClick={() => router.push('/verification')}
            // >
            //   Verify your account
            // </Button>
          )}
          {/* </div> */}
        </div>
        <div className="bg-[#f4f4f4] h-screen py-[43px] rounded-t-[40px] mt-5">
          <div className="container">
            <input
              type="file"
              name="myImage"
              // Event handler to capture file selection and update the state
              // onChange={(event) => {
              //   console.log(event.target.files[0]); // Log the selected file
              //   setSelectedImage(event.target.files[0]); // Update the state with the selected file
              // }}
            />
            <div>asfasf</div>
            <div>asfasf</div>
            <div>asfasf</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthGuard(Profile);

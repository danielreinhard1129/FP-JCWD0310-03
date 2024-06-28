// 'use client';
// import ResendVerifEmail from '@/app/(auth)/resend-verif-email/page';
// import { Badge } from '@/components/ui/badge';
// import { useAppSelector } from '@/redux/hooks';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import React, { FC } from 'react';
// import profilePict from '../../../../../public/profile.jpg';
// import useGetUser from '@/hooks/api/user/useGetUser';
// import { appConfig } from '@/utils/config';

// interface ProfileProps {
//   fullName: string;
//   address: string;
//   profilePic: string;
// }

// const Main:FC<ProfileProps> = () => {
//   const { data } = useGetUser();
//   const { isVerify, tokenExpiresIn } = useAppSelector((state) => state.user);
//   const router = useRouter();

//   let tokenExpiryDate;
//   if (tokenExpiresIn) {
//     tokenExpiryDate = new Date(tokenExpiresIn);
//   }
//   const now = new Date();

//   return (
//     <>
//       <div className="container py-6 px-6 flex flex-col text-white">
//         <div className="w-24 h-24 md:w-52 md:h-52 bg- rounded-full place-content-center relative overflow-hidden mx-auto ">
//           <Image
//             alt=""
//             src={`${appConfig.baseURL}/assets${data?.profilePic}`}
//             quality={80}
//             objectFit="cover"
//             fill
//             loading="lazy"
//             className="mx-auto"
//           />
//         </div>
//         <h1 className="text-center font-bold text-xl">{data?.fullName}</h1>
//         <p className="text-center font-extralight text-sm w-56 mx-auto mb-1">
//           {data?.Address?.address}
//         </p>
//         {/* <div className=""> */}
//         {isVerify === true ? (
//           <Badge className="bg-green-200 text-green-700">Verified</Badge>
//         ) : tokenExpiryDate && tokenExpiryDate < now ? (
//           <div className="relative flex flex-col">
//             <Badge variant={'destructive'} className="mx-auto">
//               Unverified
//             </Badge>

//             <p className="text-xs text-red-500 font-light text-center w-52 mx-auto">
//               Your verificationlink expired. <br />
//               <span
//                 className="underline hover:text-white cursor-pointer"
//                 onClick={() => {
//                   ResendVerifEmail();
//                 }}
//               >
//                 Click here
//               </span>{' '}
//               to resend it.
//             </p>
//           </div>
//         ) : (
//           <div className="relative flex flex-col">
//             <Badge variant={'destructive'} className="mx-auto">
//               Unverified
//             </Badge>

//             <p className="text-xs text-red-500 font-light text-center w-52 mx-auto">
//               <span
//                 className="underline hover:text-white cursor-pointer"
//                 onClick={() => router.push('/verification')}
//               >
//                 Click here
//               </span>{' '}
//               to verify.
//             </p>
//           </div>
//           // <Button
//           //   className="text-red-500"
//           //   onClick={() => router.push('/verification')}
//           // >
//           //   Verify your account
//           // </Button>
//         )}
//         {/* </div> */}
//       </div>
//     </>
//   );
// };

// export default Main;

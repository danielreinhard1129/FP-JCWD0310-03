// 'use client';
// import AuthGuard from '@/hoc/AuthGuard';
// import useGetUser from '@/hooks/api/user/useGetUser';
// import useUpdateUser from '@/hooks/api/user/useUpdateUser';
// import { getChangedValues } from '@/utils/getChangeValues';
// import { ChevronLeft } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import FormEditUser from './components/FormEditUser';

// interface IFormEditUser {
//   email: string;
//   fullName: string;
//   profilePic: File[];
// }

// const EditProfile = ({ params }: { params: { id: string } }) => {
//   const { user, isLoading: isLoadingGetUser } = useGetUser(Number(params.id));
//   const { updateUser, isLoading } = useUpdateUser(Number(params.id));
//   // const [selectedImage, setSelectedImage] = useState<HTMLInputElement>();
//   // const inputRef = useRef();
//   const router = useRouter();

//   // const { isVerify } = useAppSelector((state) => state.user);

//   // useEffect(() => {
//   //   if (isVerify === false) {
//   //     toast.warning('Please verify your account');
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   inputRef.current.focus();
//   // }, []);

//   const initialValues = {
//     email: user?.email || '',
//     fullName: user?.fullName || '',
//     profilePic: [],
//   };

//   if (isLoadingGetUser) {
//     return (
//       <div className=" container flex justify-center px-4 pt-24 text-4xl font-semibold">
//         Loading bos
//       </div>
//     );
//   }

//   const handleSubmit = (values: FormEditUser) => {
//     const payload = getChangedValues(values, initialValues);
//     updateUser(payload);
//   };

//   return (
//     <main className="container p-0 pt-[32px] h-screen bg-[#ffff]">
//       <div className="container flex flex-col gap-4  ">
//         <div className="flex relative ">
//           <ChevronLeft className="absolute" onClick={() => router.back()} />
//           <h1 className=" font-extrabold mx-auto">Edit profile</h1>
//         </div>

//         {/* Profile */}

//         <div className="w-full flex flex-col gap-4">
//           <FormEditUser
//             initialValues={initialValues}
//             isLoading={isLoading}
//             onSubmit={handleSubmit}
//           />
//         </div>
//       </div>
//     </main>
//   );
// };

// export default AuthGuard(EditProfile);

// 'use client';
// import AuthGuard from '@/hoc/AuthGuard';
// import useGetUser from '@/hooks/api/user/useGetUser';
// import useUpdateUser from '@/hooks/api/user/useUpdateUser';
// import { getChangedValues } from '@/utils/getChangeValues';
// import { ChevronLeft } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import FormEditUser from './components/FormEditUser';
// import { useRef, useState } from 'react';
// import Image from 'next/image';
// import { appConfig } from '@/utils/config';
// import noPic from '../../../.././../../public/pictNotFound.jpeg';

// const EditProfile = ({ params }: { params: { id: string } }) => {
//   const { user, isLoading: isLoadingGetUser } = useGetUser(Number(params.id));
//   const { updateUser, isLoading } = useUpdateUser(Number(params.id));
//   const [image, setImage] = useState('');
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const handleImageClick = () => {
//     inputRef.current?.click();
//   };

//   const handleImageChange = (e: any) => {
//     const file = e.target.file[0];
//     console.log('ini handle imagech', file);
//     setImage(e.target.file[0]);
//   };

//   const router = useRouter();

//   const initialValues = {
//     email: user?.email || '',
//     fullName: user?.fullName || '',
//     profilePic: [],
//   };

//   if (isLoadingGetUser) {
//     return (
//       <div className="container flex justify-center px-4 pt-24 text-4xl font-semibold">
//         Loading bos
//       </div>
//     );
//   }

//   const handleSubmit = (values: any) => {
//     const payload = getChangedValues(values, initialValues);
//     updateUser(payload);
//   };

//   return (
//     <main className="container p-0 pt-[32px] h-screen bg-[#ffff]">
//       <div className="container flex flex-col gap-4">
//         <div className="flex relative">
//           <ChevronLeft className="absolute" onClick={() => router.back()} />
//           <h1 className="font-extrabold mx-auto">Edit profile</h1>
//         </div>

//         <div className="w-full flex flex-col gap-4">
//           <div
//             className="w-20 h-20 rounded-full border-2 my-auto justify-center relative overflow-hidden mx-auto "
//             onClick={handleImageClick}
//           >
//             {image ? (
//               <Image
//                 alt="ProfilePict"
//                 src={URL.createObjectURL(image) || ''}
//                 quality={80}
//                 objectFit="cover"
//                 fill
//                 loading="lazy"
//                 className="mx-auto"
//               />
//             ) : (
//               <Image
//                 alt="ProfilePict"
//                 src={
//                   user?.profilePic
//                     ? user.profilePic.includes('googleusercontent.com')
//                       ? user.profilePic
//                       : `${appConfig.baseURL}/assets/${user.profilePic}`
//                     : `${noPic}` // Path to your default image
//                 }
//                 quality={80}
//                 objectFit="cover"
//                 fill
//                 loading="lazy"
//                 className="mx-auto"
//               />
//             )}
//             <input
//               type="file"
//               ref={inputRef}
//               style={{ display: 'none' }}
//               onChange={handleImageChange}
//             />
//           </div>
//           <FormEditUser
//             initialValues={initialValues}
//             isLoading={isLoading}
//             onSubmit={handleSubmit}
//           />
//         </div>
//       </div>
//     </main>
//   );
// };

// export default AuthGuard(EditProfile);

'use client';
import AuthGuard from '@/hoc/AuthGuard';
import useGetUser from '@/hooks/api/user/useGetUser';
import useUpdateUser from '@/hooks/api/user/useUpdateUser';

import { getChangedValues } from '@/utils/getChangeValues';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import noPic from '../../../.././../../public/pictNotFound.jpeg';
import FormEditUser from './components/FormEditUser';
import { BASE_API_URL } from '@/utils/config';

interface IFormEditUser {
  email: string;
  fullName: string;
  password: string;
  profilePic: File[];
}

const EditProfile = ({ params }: { params: { id: string } }) => {
  const { user, isLoading: isLoadingGetUser } = useGetUser(Number(params.id));
  const { updateUser, isLoading } = useUpdateUser(Number(params.id));
  const [image, setImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Selected file:', file);
      setImage(file);
    }
  };

  const router = useRouter();

  const initialValues = {
    email: user?.email || '',
    fullName: user?.fullName || '',
    password: user?.password || '',
    profilePic: [],
  };

  if (isLoadingGetUser) {
    return (
      <div className="container flex justify-center px-4 pt-24 text-4xl font-semibold">
        Loading bos
      </div>
    );
  }

  const handleSubmit = (values: Partial<IFormEditUser>) => {
    const payload = getChangedValues(values, initialValues);
    if (image) {
      payload.profilePic = [image];
    }

    updateUser(payload);
    console.log('ini pay', payload);
  };

  return (
    <main className="container p-0 pt-[32px] h-screen bg-[#ffff]">
      <div className="container flex flex-col gap-4">
        <div className="flex relative">
          <ChevronLeft className="absolute" onClick={() => router.back()} />
          <h1 className="font-extrabold mx-auto">Edit profile</h1>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div
            className="w-36 h-36 rounded-full border-2 my-auto justify-center relative overflow-hidden mx-auto "
            onClick={handleImageClick}
          >
            {image ? (
              <Image
                alt="ProfilePict"
                src={URL.createObjectURL(image)}
                quality={80}
                objectFit="cover"
                fill
                loading="lazy"
                className="mx-auto"
              />
            ) : (
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
            )}
            <input
              type="file"
              name="profilePic"
              ref={inputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
          <FormEditUser
            initialValues={initialValues}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
};

export default AuthGuard(EditProfile);

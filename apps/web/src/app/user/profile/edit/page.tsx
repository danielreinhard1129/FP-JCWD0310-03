'use client';
import useUpdateUser from '@/hooks/api/user/useUpdateUser';
import CustomerAuthGuard from '@/hoc/CustomerAuthGuard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { BASE_API_URL } from '@/utils/config';
import { getChangedValues } from '@/utils/getChangeValues';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import noPic from '../../../../../public/pictNotFound.jpeg';
import FormEditUser from './components/FormEditUser';

interface IFormEditUser {
  email: string;
  fullName: string;
  profilePic: File[];
}

const EditProfile = () => {
  const { id, email, fullName, role, isVerify, profilePic, tokenExpiresIn } =
    useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { updateUser, isLoading } = useUpdateUser();
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
    email: email || '',
    fullName: fullName || '',
    // password: password || '',
    profilePic: [],
  };

  const handleSubmit = (values: Partial<IFormEditUser>) => {
    const payload = getChangedValues(values, initialValues);
    if (image) {
      payload.profilePic = [image];
    }
    updateUser(payload);
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
              // <Image
              //   alt="ProfilePict"
              //   src={
              //     profilePic
              //       ? profilePic.includes('googleusercontent.com')
              //         ? profilePic
              //         : `${BASE_API_URL}/assets${profilePic}`
              //       : noPic.src // Path to your default image
              //   }
              //   quality={80}
              //   objectFit="cover"
              //   fill
              //   loading="lazy"
              //   className="mx-auto"
              // />
              <Image
                alt="ProfilePict"
                src={
                  profilePic ? `${BASE_API_URL}/assets${profilePic}` : noPic.src // Path to your default image
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

export default CustomerAuthGuard(EditProfile);

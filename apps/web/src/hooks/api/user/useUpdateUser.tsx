// 'use client';

// // import { axiosInstance } from '@/lib/axios';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import useAxios from '../useAxios';
// import { IFormUser, User } from '@/types/user.type';
// import { toast } from 'sonner';
// import { AxiosError } from 'axios';

// const useUpdateUser = (id: number) => {
//   const { axiosInstance } = useAxios();
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const updateUser = async (payload: Partial<IFormUser>) => {
//     setIsLoading(true);
//     try {
//       const { email, fullName, profilePic } = payload;
//       const updateUserForm = new FormData();

//       if (fullName) updateUserForm.append('fullName', fullName);
//       if (email) updateUserForm.append('email', email);
//       if (profilePic)
//         profilePic.forEach((file) => {
//           updateUserForm.append('profilePic', file);
//         });

//       await axiosInstance.patch<User>(`/user/profile/${id}`, updateUserForm);

//       toast.success('edit profile success!');
//       router.push('/profile');
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         toast.error(error.response?.data);
//         console.log(error);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return { updateUser, isLoading };
// };

// export default useUpdateUser;

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAxios from '../useAxios';
import { IFormUser, User } from '@/types/user.type';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const useUpdateUser = (id: number) => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateUser = async (payload: Partial<IFormUser>) => {
    setIsLoading(true);
    try {
      const { email, fullName, password, profilePic, newPassword } = payload;
      const updateUserForm = new FormData();

      if (fullName) updateUserForm.append('fullName', fullName);
      if (email) updateUserForm.append('email', email);
      if (password) updateUserForm.append('password', password);
      if (newPassword) updateUserForm.append('newPassword', newPassword);
      if (profilePic && profilePic.length > 0) {
        updateUserForm.append('profilePic', profilePic[0]);
      }

      await axiosInstance.patch<User>(`/user/profile/${id}`, updateUserForm);

      toast.success('Edit profile success!');
      router.push(`/profile/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || 'Something went wrong');
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUser, isLoading };
};

export default useUpdateUser;

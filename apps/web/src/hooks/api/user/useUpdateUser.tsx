'use client';

import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slices/userSlice';
import { IFormUser, User } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import useAxios from '../useAxios';

interface UpdateResponse {
  data: User;
}

const useUpdateUser = () => {
  const dispatch = useAppDispatch();
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateUser = async (payload: Partial<IFormUser>) => {
    setIsLoading(true);
    try {
      const {
        email,
        fullName,
        password,
        profilePic,
        newPassword,
        addressLine,
        city,
        isPrimary,
        latitude,
        longitude,
      } = payload;
      const updateUserForm = new FormData();

      if (fullName) updateUserForm.append('fullName', fullName);
      if (email) updateUserForm.append('email', email);
      if (password) updateUserForm.append('password', password);
      if (newPassword) updateUserForm.append('newPassword', newPassword);
      if (addressLine) updateUserForm.append('addressLine', addressLine);
      if (city) updateUserForm.append('city', city);
      if (latitude) updateUserForm.append('latitude', latitude);
      if (longitude) updateUserForm.append('longitude', longitude);
      if (isPrimary !== undefined)
        updateUserForm.append('isPrimary', Number(isPrimary).toString());
      if (profilePic && profilePic.length > 0) {
        updateUserForm.append('profilePic', profilePic[0]);
      }

      const { data } = await axiosInstance.patch(
        `/user/profile`,
        updateUserForm,
      );
      dispatch(loginAction(data));
      toast.success('Edit profile success!');
      router.push(`/user/profile`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || 'Something went wrong');
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUser, isLoading };
};

export default useUpdateUser;

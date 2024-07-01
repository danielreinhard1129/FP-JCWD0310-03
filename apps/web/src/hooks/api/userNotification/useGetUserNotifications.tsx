'use client';

import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { UserNotification } from '@/types/notification.type';

interface GetUserNotificationsQuery {
  userId?: number;
}

const useGetUserNotifications = (queries: GetUserNotificationsQuery) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<UserNotification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUserNotifications = async () => {
    try {     
      const { data } = await axiosInstance.get('/user-notifications', {
        params: queries,
      })
      setData(data.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    };
  }

  useEffect(() => {
    getUserNotifications();

  }, [queries.userId]);

  return { data, isLoading, refetch: getUserNotifications };
};

export default useGetUserNotifications;
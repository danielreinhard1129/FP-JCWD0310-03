'use client';

import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { UserNotification } from '@/types/notification.type';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';

interface GetUserNotificationsQuery extends IPaginationQueries {
  
}

const useGetUserNotifications = (queries: GetUserNotificationsQuery) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<UserNotification[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUserNotifications = async () => {
    try {     
      const { data } = await axiosInstance.get('/user-notifications', {
        params: queries,
      })
      setData(data.data);
      setMeta(data.meta);
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

  },  [queries.page, queries.take, queries.sortOrder]);
  return { data, isLoading, meta, refetch: getUserNotifications };
};

export default useGetUserNotifications;
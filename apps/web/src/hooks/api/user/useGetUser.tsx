// 'use client';
// import { User } from '@/types/user.type';
// import React, { useEffect, useState } from 'react';
// import useAxios from '../useAxios';
// import { AxiosError } from 'axios';
// import { toast } from 'sonner';

// const useGetUser = (id: number) => {
//   const { axiosInstance } = useAxios();
//   const [data, setData] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const getUser = async () => {
//     try {
//       const { data } = await axiosInstance.get<User>(`/user/profile/${id}`);

//       setData(data);
//       console.log(data);
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         toast.error(error.response?.data);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     getUser();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return { user: data, isLoading, refetch: getUser };
// };

// export default useGetUser;

'use client';
// import { axiosInstance } from '@/lib/axios';
import { Employee } from '@/types/employee.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { IFormUser, User } from '@/types/user.type';

const useGetUser = (id: number) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get<User>(`/user/profile/${id}`);
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        // TODO : replace console.log with toast
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);
  return { user: data, isLoading, refetch: getUser };
};

export default useGetUser;

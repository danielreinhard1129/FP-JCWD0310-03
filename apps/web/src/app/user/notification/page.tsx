'use client'
import NotificationCard from '@/components/NotificationCard';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import useGetUserNotifications from '@/hooks/api/userNotification/useGetUserNotifications';
import useUpdateUserNotification from '@/hooks/api/userNotification/useUpdateUserNotification';
import { useAppSelector } from '@/redux/hooks';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Notification = () => {
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const { data: UserNotifications, refetch, meta, isLoading } = useGetUserNotifications({
    page,
    take: 8
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const { updateUserNotification } = useUpdateUserNotification()

  const handleClick = async () => {
    try {
      await updateUserNotification({ isAll: Number(Boolean(true)) });
      refetch();
    } catch (error) {
      console.error('Failed to update pickup order', error);
    }
  };

  return (
    <div className='relative min-h-screen bg-mythemes-grey'>
      <div className='absolute z-50 flex flex-col gap-3 container bg-white px-6'>
        <div className='relative flex gap-2 my-4'>
          <ChevronLeft className='absolute cursor-pointer h-6 my-auto' onClick={() => router.back()} />
          <h1 className='font-bold mx-auto my-auto'>Notifications</h1>
        </div>
      </div>
      <div className='flex flex-col gap-2 pt-16 container px-6'>
        {UserNotifications.map((userNotification, index) => {
          return (
            <NotificationCard
              key={index}
              userNotificationId={userNotification.id}
              title={userNotification.notification?.title}
              description={userNotification.notification?.description}
              refetch={refetch}
            />
          )
        })}
      </div>
      <div className='flex flex-col gap-2 container px-6'>
        <div className='mx-auto'>
        <Pagination 
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        />
        </div>
        <Button className='bg-gray-400 hover:bg-mythemes-mainYellow' onClick={handleClick}>Clear Notifications</Button>
      </div>
    </div>
  )
}

export default Notification
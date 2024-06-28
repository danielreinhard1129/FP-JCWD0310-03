'use client'
import NotificationCard from '@/components/NotificationCard';
import useGetUserNotifications from '@/hooks/api/userNotification/useGetUserNotifications';
import { useAppSelector } from '@/redux/hooks';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Notification = () => {
  const { id } = useAppSelector((state) => state.user);
  const { data: UserNotifications, refetch } = useGetUserNotifications({
    userId: id,
  });

  const router = useRouter();
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
    </div>
  )
}

export default Notification
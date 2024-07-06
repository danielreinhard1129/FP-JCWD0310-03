'use client'
import useUpdateUserNotification from '@/hooks/api/userNotification/useUpdateUserNotification';
import { X } from 'lucide-react';
import { FC } from 'react';
import { Separator } from './ui/separator';


interface NotificationCardProps {
  key: number;
  userNotificationId: number;
  title: string | undefined;
  description: string | undefined
  refetch: () => void
}

const NotificationCard: FC<NotificationCardProps> = ({
  key,
  userNotificationId,
  title,
  description,
  refetch,

}) => {
  const { updateUserNotification  } = useUpdateUserNotification()

  const handleUpdate = async () => {
    try {
      await updateUserNotification({userNotificationId});
      refetch();
    } catch (error) {
      console.error('Failed to update pickup order', error);
    }
  };

  
  return (
    <div key={key} className='relative flex flex-col overflow-hidden shadow-md bg-white py-3 pl-5 pr-3 rounded-xl'>
      <div className='flex justify-between'>
        <p className='text-gray-600 text-md font-bold align-top'>{title}</p>
        <X className='cursor-pointer text-red-600 h-5 w-5' onClick={handleUpdate}/>
        <div className='absolute top-0 left-0 h-full w-2 bg-mythemes-mainYellow'></div>
      </div>
      <p className='text-sm text-gray-500 mt-5'>{description}</p>    
    </div>
  )
}
export default NotificationCard
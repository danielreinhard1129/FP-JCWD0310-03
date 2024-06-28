'use client';

import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';

interface UpdateUserNotificationArgs {
    userNotificationId: number,
}

const useUpdateUserNotification = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateUserNotification = async (payload: UpdateUserNotificationArgs) => {
        setIsLoading(true);
        try {
            await axiosInstance.patch(`/user-notifications/`, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { updateUserNotification, isLoading };
};

export default useUpdateUserNotification;
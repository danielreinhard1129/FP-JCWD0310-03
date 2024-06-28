import prisma from '@/prisma';

interface UpdateUserNotificationBody {
    userNotificationId: number;
}
export const updateUserNotificationService = async (
  body: UpdateUserNotificationBody,
) => {
  try {
    const { userNotificationId } = body;

    const userNotification = await prisma.userNotification.findFirst({
      where: { id: userNotificationId }
    })

    if (!userNotification) {
      throw new Error('User Notification not Found!')
    }

    return await prisma.userNotification.update({
      where: { id: userNotificationId },
      data: {
        isRead: true,
      },
    });

  } catch (error) {
    throw error;
  }
};
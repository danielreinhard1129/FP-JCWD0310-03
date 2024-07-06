import prisma from '@/prisma';

interface UpdateUserNotificationBody {
  id: number;
  userNotificationId: number;
  isAll: number;
}
export const updateUserNotificationService = async (
  body: UpdateUserNotificationBody,
) => {
  try {
    const { userNotificationId, id, isAll } = body;

    if (isAll) {
      const existingUser = await prisma.user.findFirst({
        where: { id: id },
        select: { id: true },
      });

      if (!existingUser) {
        throw new Error('User not found!');
      }

      return await prisma.userNotification.updateMany({
        where: {
          userId: existingUser.id,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });
    } else {
      const userNotification = await prisma.userNotification.findFirst({
        where: { id: userNotificationId },
      });

      if (!userNotification) {
        throw new Error('User notification not found!');
      }

      return await prisma.userNotification.update({
        where: { id: userNotificationId },
        data: {
          isRead: true,
        },
      });
    }
  } catch (error) {
    throw error;
  }
};
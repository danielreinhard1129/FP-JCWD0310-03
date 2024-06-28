import prisma from "@/prisma";

interface GetUserNotificationsQuery {
    userId: number;
}

export const getUserNotificationsService = async (query: GetUserNotificationsQuery) => {
    try {
        const { userId } = query;

        const userNotifications = await prisma.userNotification.findMany({
            where: { userId: userId, isRead: false },
            include: { notification: true, user: true},
        });

        return {
            data: userNotifications,
        };
    } catch (error) {
        throw error
    }
}
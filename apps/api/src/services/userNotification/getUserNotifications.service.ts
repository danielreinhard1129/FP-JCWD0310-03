import prisma from "@/prisma";
import { PaginationQueryParams } from "@/types/pagination.type";
import { Prisma } from "@prisma/client";

interface GetUserNotificationsQuery extends PaginationQueryParams {
    userId: number;
}

export const getUserNotificationsService = async (query: GetUserNotificationsQuery) => {
    try {
        const { userId, page, sortBy, sortOrder, take } = query;

        const whereClause: Prisma.UserNotificationWhereInput = {
            userId: userId,
            isRead: false
        };

        const userNotifications = await prisma.userNotification.findMany({
            where: whereClause,
            skip: (page - 1) * take,
            take: take,
            orderBy: {
                [sortBy]: sortOrder,
            },
            include: { notification: true, user: true },
        });

        const count = await prisma.userNotification.count({
            where: whereClause,
          });

        return {
            data: userNotifications,
            meta: { page, take, total: count }
        };
    } catch (error) {
        throw error
    }
}
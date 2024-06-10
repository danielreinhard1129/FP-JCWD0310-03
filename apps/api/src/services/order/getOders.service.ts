import prisma from "@/prisma"
import { PaginationQueryParams } from "@/types/pagination.type";

import { Prisma } from "@prisma/client";

interface GetOrdersQuery extends PaginationQueryParams {
    id: number;
}

export const getOrdersService = async (query: GetOrdersQuery) => {
    try {
        const { page, sortBy, sortOrder, take, id } = query;

        const existingUser = await prisma.user.findFirst({
            where: { id: id },
            select: { Employee: true }
        })

        const pickupOrderData = await prisma.pickupOrder.findMany({
            where: { outletId: existingUser?.Employee?.outletId },
            select: { id: true }
        })

        const pickupOrderIds = pickupOrderData.map(pickup => pickup.id);

        const whereClause: Prisma.OrderWhereInput = {
            pickupOrderId: { in: pickupOrderIds }
        }

        const orders = await prisma.order.findMany({
            where: whereClause,
            skip: (page - 1) * take,
            take: take,
            orderBy: {
                [sortBy]: sortOrder,
            },
            include: { OrderItem: true, pickupOrder: true },
        });

        const count = await prisma.order.count({ where: whereClause });

        if (!orders) {
            throw new Error('User not Found!')
        }

        return {
            data: orders,
            meta: { page, take, total: count }
        };
    } catch (error) {
        throw error
    }
}
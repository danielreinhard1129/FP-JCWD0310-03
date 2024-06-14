import prisma from "@/prisma"
import { PaginationQueryParams } from "@/types/pagination.type";

import { Prisma } from "@prisma/client";

interface GetOnPendingOrdersQuery extends PaginationQueryParams {
    id: number;
}

export const getOnPendingOrdersService = async (query: GetOnPendingOrdersQuery) => {
    try {
        const { page, sortBy, sortOrder, take, id } = query;

        const existingUser = await prisma.user.findFirst({
            where: { id: id },
            select: { Employee: true, role: true }
        })

        if (existingUser?.role != "WORKER") {
            throw new Error('Your User Role is Not Allowed to be Accessed!')
        }

        const pickupOrders = await prisma.pickupOrder.findMany({
            where: { outletId: existingUser.Employee?.outletId },
            select: { id: true }
        });

        const pickupOrderIds = pickupOrders.map(pickup => pickup.id);

        const whereClause: Prisma.OrderWhereInput = {
            pickupOrderId: { in: pickupOrderIds },
            orderStatus: "Laundry_Has_Arrived_At_Outlet"
        }
        const orders = await prisma.order.findMany({
            where: whereClause,
            skip: (page - 1) * take,
            take: take,
            orderBy: {
                [sortBy]: sortOrder,
            },
            include: { OrderItem: true, pickupOrder: true },
        })

        const count = await prisma.order.count({ where: whereClause });

        return {
            data: orders,
            meta: { page, take, total: count }
        };
    } catch (error) {
        throw error
    }
}
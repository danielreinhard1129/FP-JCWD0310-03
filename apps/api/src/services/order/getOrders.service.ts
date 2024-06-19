import prisma from "@/prisma"
import { PaginationQueryParams } from "@/types/pagination.type";

import { OrderStatus, Prisma } from "@prisma/client";

interface GetOrdersQuery extends PaginationQueryParams {
    id: number;
    filterOutlet?: string | number;
    filterStatus?: string | number;
}

export const getOrdersService = async (query: GetOrdersQuery) => {
    try {
        const { page, sortBy, sortOrder, take, id, filterOutlet, filterStatus } = query;

        const existingUser = await prisma.user.findFirst({
            where: { id: id },
            select: { employee: true, role:true }
        })        

        const whereClause: Prisma.OrderWhereInput = {
        }        

        if(existingUser?.role=="SUPER_ADMIN" && filterOutlet!='all'){
            const pickupOrderData = await prisma.pickupOrder.findMany({
                where: { outletId: Number(filterOutlet)},
                select: { id: true }
            })
            const pickupOrderIds = pickupOrderData.map(pickup => pickup.id);
            whereClause.pickupOrderId = { in: pickupOrderIds };
        }
        if(existingUser?.role!="SUPER_ADMIN"){
            const pickupOrderData = await prisma.pickupOrder.findMany({
                where: { outletId: existingUser?.employee?.outletId },
                select: { id: true }
            })
            const pickupOrderIds = pickupOrderData.map(pickup => pickup.id);
            whereClause.pickupOrderId = { in: pickupOrderIds };
        }

        if (filterStatus !== 'all') {
            whereClause.orderStatus = filterStatus as OrderStatus;
        }        

        const orders = await prisma.order.findMany({
            where: whereClause,
            skip: (page - 1) * take,
            take: take,
            orderBy: {
                [sortBy]: sortOrder,
            },
            include: { orderItem: true, pickupOrder: {include: {user: true}} },
        });

        const count = await prisma.order.count({ where: whereClause });

        // if (!orders) {
        //     throw new Error('User not Found!')
        // }

        return {
            data: orders,
            meta: { page, take, total: count }
        };
    } catch (error) {
        throw error
    }
}
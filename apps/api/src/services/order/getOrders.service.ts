import prisma from "@/prisma";
import { PaginationQueryParams } from "@/types/pagination.type";

import { OrderStatus, Prisma } from "@prisma/client";

interface GetOrdersQuery extends PaginationQueryParams {
    id: number;
    filterOutlet?: string | number;
    filterStatus?: string | number;
    filterDate?: Date,
    search?: string,
    filterCategory?: string
}

export const getOrdersService = async (query: GetOrdersQuery) => {
    try {
        const { page, sortBy, sortOrder, take, id, filterOutlet, filterStatus, filterDate, search, filterCategory } = query;

        const existingUser = await prisma.user.findFirst({
            where: { id: id },
            select: { employee: true, role: true }
        })

        const whereClause: Prisma.OrderWhereInput = {
        }

        if (existingUser?.role == "CUSTOMER") {
            const pickupOrderData = await prisma.pickupOrder.findMany({
                where: { userId: id },
                select: { id: true }
            })
            const pickupOrderIds = pickupOrderData.map(pickup => pickup.id);
            whereClause.pickupOrderId = { in: pickupOrderIds };
        }

        if (existingUser?.role != "CUSTOMER") {

            if (existingUser?.role == "SUPER_ADMIN" && filterOutlet != 'all') {
                const pickupOrderData = await prisma.pickupOrder.findMany({
                    where: { outletId: Number(filterOutlet) },
                    select: { id: true }
                })
                const pickupOrderIds = pickupOrderData.map(pickup => pickup.id);
                whereClause.pickupOrderId = { in: pickupOrderIds };
            }

            if (existingUser?.role != "SUPER_ADMIN") {
                const pickupOrderData = await prisma.pickupOrder.findMany({
                    where: { outletId: existingUser?.employee?.outletId },
                    select: { id: true }
                })
                const pickupOrderIds = pickupOrderData.map(pickup => pickup.id);
                whereClause.pickupOrderId = { in: pickupOrderIds };
            }

        }

        if (filterStatus !== 'all') {
            whereClause.orderStatus = filterStatus as OrderStatus;
        }

        if (filterStatus == 'all') {
            if (filterCategory == 'pickup') {
                whereClause.orderStatus = {
                    in: [
                        OrderStatus.WAITING_FOR_PICKUP_DRIVER,
                        OrderStatus.ON_THE_WAY_TO_CUSTOMER,
                        OrderStatus.ON_THE_WAY_TO_OUTLET,
                        OrderStatus.ARRIVED_AT_OUTLET
                    ]
                };
            }
            if (filterCategory == 'process') {
                whereClause.orderStatus = {
                    in: [
                        OrderStatus.READY_FOR_WASHING,
                        OrderStatus.BEING_WASHED,
                        OrderStatus.WASHING_COMPLETED,
                        OrderStatus.BEING_IRONED,
                        OrderStatus.IRONING_COMPLETED,
                        OrderStatus.BEING_PACKED,
                        OrderStatus.AWAITING_PAYMENT
                    ]
                };
            }
            if (filterCategory == 'delivery') {
                whereClause.orderStatus = {
                    in: [
                        OrderStatus.READY_FOR_DELIVERY,
                        OrderStatus.WAITING_FOR_DELIVERY_DRIVER,
                        OrderStatus.BEING_DELIVERED_TO_CUSTOMER
                    ]
                };
            }
            if (filterCategory == 'completed') {
                whereClause.orderStatus = {
                    in: [
                        OrderStatus.RECEIVED_BY_CUSTOMER
                    ]
                };
            }
        }

        if (filterDate !== undefined) {
            // whereClause.createdAt = filterDate
            const startOfDay = new Date(filterDate.setHours(0, 0, 0, 0));
            const endOfDay = new Date(filterDate.setHours(23, 59, 59, 999));
            whereClause.createdAt = {
                gte: startOfDay,
                lte: endOfDay
            };
        }

        if (search !== '') {
            whereClause.orderNumber = {
                contains: search?.toUpperCase(),
            };
        }

        const orders = await prisma.order.findMany({
            where: whereClause,
            skip: (page - 1) * take,
            take: take,
            orderBy: {
                [sortBy]: sortOrder,
            },
            include: { orderItem: true, pickupOrder: { include: { user: true } } },
        });

        const count = await prisma.order.count({ where: whereClause });

        return {
            data: orders,
            meta: { page, take, total: count }
        };
    } catch (error) {
        throw error
    }
}
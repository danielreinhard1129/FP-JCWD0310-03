import prisma from "@/prisma";

interface GetOrderItemsQuery {
    orderId: number;
}

export const getOrderItemsService = async (query: GetOrderItemsQuery) => {
    try {
        const { orderId } = query;

        const orderItems = await prisma.orderItem.findMany({
            where: { orderId: orderId },
            include: { laundryItem: true, order: true },
        });

        return {
            data: orderItems,
        };
    } catch (error) {
        throw error
    }
}
import prisma from '@/prisma';
import { OrderStatus } from '@prisma/client';

interface UpdateStatusOrderBody {
    orderId: number,
    workerId: number,
    orderStatus: OrderStatus,
}
export const updateStatusOrderService = async (
    body: UpdateStatusOrderBody,
) => {
    try {
        const { orderId, workerId, orderStatus } = body;

        const existingOrder = await prisma.order.findFirst({
            where: { id: orderId },
            select: { orderStatus: true }
        })

        if (!existingOrder) {
            throw new Error('Order not Found!')
        }

        const updateStatusUpdate = await prisma.order.update({
            where: { id: orderId },
            data: {
                orderStatus: orderStatus,
            },
        });

        const createOrderWorker = await prisma.orderWorker.create({
            data: {
                orderId: orderId,
                workerId: workerId,
            }
        })


        return {
            order: updateStatusUpdate,
            orderWorker: createOrderWorker,
        }

    } catch (error) {
        throw error;
    }
};

import prisma from '@/prisma';
import { Order } from '@prisma/client';


interface CreateOrderBody
    extends Pick<Order, 'weight'> {
    orderItem: { qty: string, laundryItemId: string }[];
    pickupNumber: string
}

export const CreateOrderService = async (
    body: CreateOrderBody,
) => {
    try {
        const { weight, pickupNumber, orderItem } = body;

        const existingPickupOrder = await prisma.pickupOrder.findFirst({
            where: { pickupNumber: pickupNumber },
            select: { id: true }
        })

        if (!existingPickupOrder) {
            throw new Error('Pickup Order Not Found!');
        }

        const addDataOrder = await prisma.order.create({
            data: {
                pickupOrderId: existingPickupOrder.id,
                orderNumber: "OrderNumber##",
                weight: Number(weight),
                laundryPrice: 99999,
            },
        });

        const addDataOrderItems = await Promise.all(orderItem.map(async (item) => {
            return await prisma.orderItem.create({
                data: {
                    orderId: addDataOrder.id,
                    qty: Number(item.qty),
                    laundryItemId: Number(item.laundryItemId),
                },
            });
        }));

        const updateDataPickupOrder = await prisma.pickupOrder.update({
            where: { pickupNumber: pickupNumber },
            data: {
                isOrderCreated: true,
            }
        })

        return {
            order: addDataOrder,
            orderItem: addDataOrderItems,
            pickupOrder: updateDataPickupOrder,
        }

    } catch (error) {
        throw error;
    }
};
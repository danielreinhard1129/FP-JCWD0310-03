
import prisma from '@/prisma';
import { EmployeeWorkShift, Order, OrderStatus } from '@prisma/client';


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
            select: { id: true, outletId: true }
        })

        if (!existingPickupOrder) {
            throw new Error('Pickup Order Not Found!');
        }

        if (!weight) {
            throw new Error('Weight are required')
        }

        const newOrder = await prisma.$transaction(async (tx) => {

            const addDataOrder = await tx.order.update({
                where: {
                    pickupOrderId: existingPickupOrder.id,
                },
                data: {
                    weight: Number(weight),
                    laundryPrice: Number(weight * 6000),
                    orderStatus: OrderStatus.READY_FOR_WASHING
                },
            });

            const addDataOrderItems = await Promise.all(orderItem.map(async (item) => {
                return await tx.orderItem.create({
                    data: {
                        orderId: addDataOrder.id,
                        qty: Number(item.qty),
                        laundryItemId: Number(item.laundryItemId),
                    },
                });
            }));

            const updateDataPickupOrder = await tx.pickupOrder.update({
                where: { pickupNumber: pickupNumber },
                data: {
                    isOrderCreated: true,
                }
            })

            const now = new Date();
            const currentHour = now.getUTCHours() + 7
            let setWorkShift

            if (currentHour >= 6 && currentHour < 18) {
                setWorkShift = EmployeeWorkShift.DAY
            }
            if (currentHour >= 18 || currentHour < 6) {
                setWorkShift = EmployeeWorkShift.NIGHT
            }

            const createNotification = await tx.notification.create({
                data: {
                    title: "Incoming Laundry Task",
                    description: "New laundry arrived at washing station",
                }
            })

            const getUserId = await tx.employee.findMany({
                where: {
                    outletId: existingPickupOrder.outletId,
                    workShift: setWorkShift,
                    station: "WASHING"
                },
                select: { userId: true }
            })
            const userIds = getUserId.map(user => user.userId)
            const createUserNotification = await Promise.all(userIds.map(async (userId) => {
                await tx.userNotification.create({
                    data: {
                        notificationId: createNotification.id,
                        userId: userId
                    }
                });
            }));

            return {
                order: addDataOrder,
                orderItem: addDataOrderItems,
                pickupOrder: updateDataPickupOrder,
                userNotification: createUserNotification,
            }
        })

        return newOrder

    } catch (error) {
        throw error;
    }
};
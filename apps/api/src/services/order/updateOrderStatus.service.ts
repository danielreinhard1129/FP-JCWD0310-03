import prisma from '@/prisma';
import { EmployeeStation, EmployeeWorkShift, OrderStatus } from '@prisma/client';

interface UpdateOrderStatusBody {
    orderId: number,
    workerId: number,
    orderStatus: OrderStatus,
}
export const updateOrderStatusService = async (
    body: UpdateOrderStatusBody,
) => {
    try {
        const { orderId, workerId, orderStatus } = body;

        const existingOrder = await prisma.order.findFirst({
            where: { id: orderId },
            select: { orderStatus: true,orderNumber: true, isPaid: true, pickupOrder: { select: { outletId: true , userId: true} } }
        })

        if (!existingOrder) {
            throw new Error('Order not Found!')
        }

        let setOrderStatus = orderStatus

        if (orderStatus == 'AWAITING_PAYMENT' && existingOrder.isPaid == true) {
            setOrderStatus = OrderStatus.READY_FOR_DELIVERY
        }

        const updateStatusUpdate = await prisma.order.update({
            where: { id: orderId },
            data: {
                orderStatus: setOrderStatus,
            },
        });

        if (orderStatus == 'AWAITING_PAYMENT' && existingOrder.isPaid == false) {
            const createNotification = await prisma.notification.create({
                data: {
                    title: "Payment Reminder",
                    description: `Your laundry with order number ${existingOrder.orderNumber} has been packed. Please complete the payment to proceed with the delivery process. Thank you.`,
                }
            })

            await prisma.userNotification.create({
                data: {
                    notificationId: createNotification.id,
                    userId: existingOrder.pickupOrder.userId
                }
            });
        }

        if (!Number.isNaN(workerId)) {
            const now = new Date();
            const currentHour = now.getHours();
            let setWorkShift

            if (currentHour >= 6 && currentHour < 18) {
                setWorkShift = EmployeeWorkShift.DAY
            }
            if (currentHour >= 18 || currentHour < 6) {
                setWorkShift = EmployeeWorkShift.NIGHT
            }



            if (orderStatus == 'WASHING_COMPLETED') {
                const orderWorker = await prisma.orderWorker.findFirst({
                    where: { orderId: orderId, workerId: workerId, station: 'WASHING' },
                    select: { id: true }
                })
                await prisma.orderWorker.update({
                    where: { id: orderWorker?.id },
                    data: {
                        isComplete: true
                    }
                })

                // create notifications
                const createNotification = await prisma.notification.create({
                    data: {
                        title: "Incoming Laundry Task",
                        description: "New laundry arrived at ironing station",
                    }
                })
                // distribute notifications
                const getUserId = await prisma.employee.findMany({
                    where: {
                        outletId: existingOrder.pickupOrder.outletId,
                        workShift: setWorkShift,//hapus jika ga perlu
                        station: { not: null },//ubah jika berdasarkan station
                    },
                    select: { userId: true }
                })
                const userIds = getUserId.map(user => user.userId)
                await Promise.all(userIds.map(async (userId) => {
                    await prisma.userNotification.create({
                        data: {
                            notificationId: createNotification.id,
                            userId: userId
                        }
                    });
                }));
            }

            if (orderStatus == 'IRONING_COMPLETED') {
                const orderWorker = await prisma.orderWorker.findFirst({
                    where: { orderId: orderId, workerId: workerId, station: 'IRONING' },
                    select: { id: true }
                })
                await prisma.orderWorker.update({
                    where: { id: orderWorker?.id },
                    data: {
                        isComplete: true
                    }
                })

                // create notifications
                const createNotification = await prisma.notification.create({
                    data: {
                        title: "Incoming Laundry Task",
                        description: "New laundry arrived at packing station",
                    }
                })
                // distribute notifications
                const getUserId = await prisma.employee.findMany({
                    where: {
                        outletId: existingOrder.pickupOrder.outletId,
                        workShift: setWorkShift,//hapus jika ga perlu
                        station: { not: null },//ubah jika berdasarkan station
                    },
                    select: { userId: true }
                })
                const userIds = getUserId.map(user => user.userId)
                await Promise.all(userIds.map(async (userId) => {
                    await prisma.userNotification.create({
                        data: {
                            notificationId: createNotification.id,
                            userId: userId
                        }
                    });
                }));
            }

            if (orderStatus == 'AWAITING_PAYMENT') {
                const orderWorker = await prisma.orderWorker.findFirst({
                    where: { orderId: orderId, workerId: workerId, station: 'PACKING' },
                    select: { id: true }
                })
                await prisma.orderWorker.update({
                    where: { id: orderWorker?.id },
                    data: {
                        isComplete: true
                    }
                })
            }

            if (orderStatus == 'BEING_IRONED') {
                await prisma.orderWorker.create({
                    data: {
                        orderId: orderId,
                        workerId: workerId,
                        station: EmployeeStation.IRONING
                    }
                })
            }

            if (orderStatus == 'BEING_WASHED') {
                await prisma.orderWorker.create({
                    data: {
                        orderId: orderId,
                        workerId: workerId,
                        station: EmployeeStation.WASHING
                    }
                })
            }

            if (orderStatus == 'BEING_PACKED') {
                await prisma.orderWorker.create({
                    data: {
                        orderId: orderId,
                        workerId: workerId,
                        station: EmployeeStation.PACKING
                    }
                })
            }
        }

        return {
            order: updateStatusUpdate,
        }

    } catch (error) {
        throw error;
    }
};
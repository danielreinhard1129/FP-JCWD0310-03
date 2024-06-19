import prisma from '@/prisma';
import { EmployeeStation, OrderStatus } from '@prisma/client';

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

        const orderWorker = await prisma.orderWorker.findFirst({
            where: {orderId: orderId, workerId: workerId, station: 'WASHING'}
        })

        if (orderStatus == 'Laundry_Finished_Washing'){
            const orderWorker = await prisma.orderWorker.findFirst({
                where: {orderId: orderId, workerId: workerId, station: 'WASHING'},
                select: {id: true}
            })
            await prisma.orderWorker.update({
                where: {id: orderWorker?.id},
                data: {
                    isComplete: true
                }
            })
        }

        if (orderStatus == 'Laundry_Finished_Ironing'){
            const orderWorker = await prisma.orderWorker.findFirst({
                where: {orderId: orderId, workerId: workerId, station: 'IRONING'},
                select: {id: true}
            })
            await prisma.orderWorker.update({
                where: {id: orderWorker?.id},
                data: {
                    isComplete: true
                }
            })
        }

        if (orderStatus == 'Laundry_Finished_Packing'){
            const orderWorker = await prisma.orderWorker.findFirst({
                where: {orderId: orderId, workerId: workerId, station: 'PACKING'},
                select: {id: true}
            })
            await prisma.orderWorker.update({
                where: {id: orderWorker?.id},
                data: {
                    isComplete: true
                }
            })
        }

        if (orderStatus == 'Laundry_Being_Ironed') {
            await prisma.orderWorker.create({
                data: {
                    orderId: orderId,
                    workerId: workerId,
                    station: EmployeeStation.IRONING
                }
            })
        }

        if (orderStatus == 'Laundry_Being_Washed') {
            await prisma.orderWorker.create({
                data: {
                    orderId: orderId,
                    workerId: workerId,
                    station: EmployeeStation.WASHING
                }
            })
        }

        if (orderStatus == 'Laundry_Being_Packed') {
            await prisma.orderWorker.create({
                data: {
                    orderId: orderId,
                    workerId: workerId,
                    station: EmployeeStation.PACKING
                }
            })
        }

        return {
        order: updateStatusUpdate,
    }

} catch (error) {
    throw error;
}
};
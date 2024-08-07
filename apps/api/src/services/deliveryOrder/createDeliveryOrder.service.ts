import prisma from '@/prisma';
import { DeliveryStatus, OrderStatus } from '@prisma/client';

interface CreateDeliveryOrderBody {
  orderId: number,
}
export const createDeliveryOrderService = async (
  body: CreateDeliveryOrderBody,
) => {
  try {
    const { orderId } = body;

    const existingDeliveryOrder = await prisma.deliveryOrder.findFirst({
      where: { orderId: orderId },
      select: { id: true, order: { select: { pickupOrder: { select: { outletId: true } } } } }
    })

    if (!existingDeliveryOrder) {
      throw new Error('Deliver Order not Created!')
    }

    const newDeliveryOrder = await prisma.$transaction(async (tx) => {

      const updateOrder = await tx.order.update({
        where: { id: orderId },
        data: { orderStatus: OrderStatus.WAITING_FOR_DELIVERY_DRIVER }
      })

      const updateDeliveryOrder = await tx.deliveryOrder.update({
        where: { id: existingDeliveryOrder.id },
        data: {
          deliveryStatus: DeliveryStatus.WAITING_FOR_DRIVER,
          createdAt: new Date(),
        },
      });

      const createNotification = await tx.notification.create({
        data: {
          title: "Incoming Delivery Order",
          description: "New delivery request at your outlet",
        }
      })

      const getUserId = await tx.employee.findMany({
        where: {
          outletId: existingDeliveryOrder.order.pickupOrder.outletId,
          workShift: null,
          station: null,
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
        order: updateOrder,
        deliveryOrder: updateDeliveryOrder,
        userNotification: createUserNotification
      };
    })

    return newDeliveryOrder
  } catch (error) {
    throw error;
  }
};
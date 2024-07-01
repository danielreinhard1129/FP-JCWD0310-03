import prisma from '@/prisma';
import { DeliveryStatus, OrderStatus } from '@prisma/client';
import { scheduleJob } from 'node-schedule';

interface UpdateDeliveryOrderBody {
  shipmentOrderId: number,
  driverId: number,
  status: string
}
export const updateDeliveryOrderService = async (
  body: UpdateDeliveryOrderBody,
) => {
  try {
    const { driverId, shipmentOrderId, status } = body;    

    const existingDeliveryOrder = await prisma.deliveryOrder.findFirst({
      where: { id: shipmentOrderId },
      select: { deliveryStatus: true, orderId: true }
    })

    if (!existingDeliveryOrder) {
      throw new Error('Deliver Order not Found!')
    }

    if (status == String(DeliveryStatus.ON_THE_WAY_TO_OUTLET)) {
      await prisma.order.update({
        where: { id: existingDeliveryOrder.orderId },
        data: { orderStatus: OrderStatus.BEING_DELIVERED_TO_CUSTOMER }
      })

      // const schedule = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
      const schedule = new Date(Date.now() + 2 * 60 * 1000);
      scheduleJob('run every ', schedule, async () => {
        const order = await prisma.order.findFirst({
          where: {
            id: existingDeliveryOrder.orderId,
            orderStatus: 'BEING_DELIVERED_TO_CUSTOMER',
          },
        });
        if(order){
          await prisma.order.update({
            where: { id: existingDeliveryOrder.orderId },
            data: { orderStatus: OrderStatus.RECEIVED_BY_CUSTOMER },
          });
        }
      });
  
    }

    return await prisma.deliveryOrder.update({
      where: { id: shipmentOrderId },
      data: {
        deliveryStatus: status as DeliveryStatus,
        driverId: driverId
      },
    });

  } catch (error) {
    throw error;
  }
};
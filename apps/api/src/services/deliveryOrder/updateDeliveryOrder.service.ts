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

    if (status == String(DeliveryStatus.On_The_Way_to_Outlet)) {
      await prisma.order.update({
        where: { id: existingDeliveryOrder.orderId },
        data: { orderStatus: OrderStatus.Laundry_Being_Delivered_To_Customer }
      })

      // schedule auto confirmetion in 2x24hours
      // const schedule = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
      const schedule = new Date(Date.now() + 2 * 60 * 1000);
      scheduleJob('run every ', schedule, async () => {
        const order = await prisma.order.findFirst({
          where: {
            id: existingDeliveryOrder.orderId,
            orderStatus: 'Laundry_Being_Delivered_To_Customer',
          },
        });
        if(order){
          await prisma.order.update({
            where: { id: existingDeliveryOrder.orderId },
            data: { orderStatus: OrderStatus.Laundry_Received_By_Customer },
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
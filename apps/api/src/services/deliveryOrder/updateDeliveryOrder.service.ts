import prisma from '@/prisma';
import { DeliveryStatus, OrderStatus } from '@prisma/client';

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
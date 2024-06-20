import prisma from '@/prisma';
import { DeliveryStatus } from '@prisma/client';

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
      select: { deliveryStatus: true }
    })

    if (!existingDeliveryOrder) {
      throw new Error('Deliver Order not Found!')
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
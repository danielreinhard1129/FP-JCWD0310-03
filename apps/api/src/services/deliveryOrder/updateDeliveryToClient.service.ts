import prisma from '@/prisma';

interface UpdateDeliveryOrderBody {
    deliveryOrderId: number,
    driveryId: number,
}
export const updateDeliveryToClientService = async (
  body: UpdateDeliveryOrderBody,
) => {
  try {
    const { driveryId, deliveryOrderId } = body;

    const existingDeliveryOrder = await prisma.deliveryOrder.findFirst({
      where: { id: deliveryOrderId, driverId: driveryId },
      select: { deliveryStatus: true }
    })

    if (!existingDeliveryOrder) {
      throw new Error('Deliver Order not Found!')
    }

    return await prisma.deliveryOrder.update({
      where: { id: deliveryOrderId },
      data: { 
        deliveryStatus: 'Received_by_Client', 
    },
    });

  } catch (error) {
    throw error;
  }
};
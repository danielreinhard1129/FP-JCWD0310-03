import prisma from '@/prisma';

interface UpdateDeliveryOrderBody {
    deliveryOrderId: number,
    driveryId: number,
}
export const updateDeliveryToOutletService = async (
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
        deliveryStatus: 'On_The_Way_to_Client', 
    },
    });

  } catch (error) {
    throw error;
  }
};
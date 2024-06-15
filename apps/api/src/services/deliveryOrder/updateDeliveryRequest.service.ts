import prisma from '@/prisma';

interface UpdateDeliveryOrderBody {
    deliveryOrderId: number,
    driveryId: number,
}
export const updateDeliveryRequestService = async (
  body: UpdateDeliveryOrderBody,
) => {
  try {
    const { driveryId, deliveryOrderId } = body;   

    const existingDeliveryOrder = await prisma.deliveryOrder.findFirst({
      where: { id: deliveryOrderId },
      select: { deliveryStatus: true }
    })

    if (!existingDeliveryOrder) {
      throw new Error('Deliver Order not Found!')
    }

    return await prisma.deliveryOrder.update({
      where: { id: deliveryOrderId },
      data: { 
        deliveryStatus: 'On_The_Way_to_Outlet', 
        driverId: driveryId
    },
    });

  } catch (error) {
    throw error;
  }
};
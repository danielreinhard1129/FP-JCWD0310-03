import prisma from '@/prisma';

interface UpdateDeliverOrderBody {
    deliverOrderId: number,
    driverId: number,
}
export const updateDeliverToClientService = async (
  body: UpdateDeliverOrderBody,
) => {
  try {
    const { driverId, deliverOrderId } = body;

    const existingDeliverOrder = await prisma.deliverOrder.findFirst({
      where: { id: deliverOrderId, driverId: driverId },
      select: { deliverStatus: true }
    })

    if (!existingDeliverOrder) {
      throw new Error('Deliver Order not Found!')
    }

    return await prisma.deliverOrder.update({
      where: { id: deliverOrderId },
      data: { 
        deliverStatus: 'Received_by_Client', 
    },
    });

  } catch (error) {
    throw error;
  }
};
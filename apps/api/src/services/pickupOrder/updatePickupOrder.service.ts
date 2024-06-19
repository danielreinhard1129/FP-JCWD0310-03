import prisma from '@/prisma';
import { PickupStatus } from '@prisma/client';

interface UpdatePickupOrderBody {
    shipmentOrderId: number,
    driverId: number,
    status: string
}
export const updatePickupOrderService = async (
  body: UpdatePickupOrderBody,
) => {
  try {
    const { driverId, shipmentOrderId, status } = body;

    const existingPickupOrder = await prisma.pickupOrder.findFirst({
      where: { id: shipmentOrderId },
      select: { pickupStatus: true }
    })

    if (!existingPickupOrder) {
      throw new Error('User not Found!')
    }

    return await prisma.pickupOrder.update({
      where: { id: shipmentOrderId },
      data: { 
        pickupStatus: status as PickupStatus, 
        driverId: driverId
    },
    });

  } catch (error) {
    throw error;
  }
};
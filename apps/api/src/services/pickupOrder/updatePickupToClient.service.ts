import prisma from '@/prisma';

interface UpdatePickupOrderBody {
    pickupOrderId: number,
    driverId: number,
}
export const updatePickupToClientService = async (
  body: UpdatePickupOrderBody,
) => {
  try {
    const { driverId, pickupOrderId } = body;

    const existingPickupOrder = await prisma.pickupOrder.findFirst({
      where: { id: pickupOrderId, driverId: driverId },
      select: { pickupStatus: true }
    })

    if (!existingPickupOrder) {
      throw new Error('User not Found!')
    }

    return await prisma.pickupOrder.update({ 
      where: { id: pickupOrderId },
      data: { 
        pickupStatus: 'On_The_Way_to_Outlet',
    },
    });

  } catch (error) {
    throw error;
  }
};
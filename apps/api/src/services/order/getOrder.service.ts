import prisma from '@/prisma';

export const getOrderService = async (id: number) => {
  try {
    
    const order = await prisma.order.findFirst({
      where: { id },
      include: {deliveryOrder: true, pickupOrder: true, payment:true},
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  } catch (error) {
    throw error;
  }
};
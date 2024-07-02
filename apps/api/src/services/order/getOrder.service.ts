import prisma from '@/prisma';

export const getOrderService = async (id: number) => {
  try {

    const order = await prisma.order.findFirst({
      where: { id },
      include: {
        deliveryOrder: true,
        pickupOrder: {
          include: {
            user: true, address: true,
            outlet: { include: { address: true } }
          }
        }, 
        payment: true,
        orderItem: {
          include: { laundryItem: true }
        }
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  } catch (error) {
    throw error;
  }
};
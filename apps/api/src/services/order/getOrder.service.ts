import prisma from '@/prisma';

interface GetOrderQuery {
  id: number,
  userId: number
}

export const getOrderService = async (query: GetOrderQuery) => {
  try {
    const { id, userId } = query
    const user = await prisma.user.findFirst({
      where: {id: userId},
      select: {role: true}
    })

    if(user?.role=='CUSTOMER'){
      const userPickupOrder = await prisma.pickupOrder.findMany({
        where: {userId: userId},
        select: {id: true}
      })

      const userPickupOrderIds = userPickupOrder.map(pickup => pickup.id);

      const userOrders = await prisma.order.findMany({
        where: { pickupOrderId: { in: userPickupOrderIds } },
        select: { id: true }
      })

      const userOrderIds = userOrders.map(order => order.id)

      if (!userOrderIds.includes(id)) {
        throw new Error(`Order Not Authorized!`);
      }
    }

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
        },
        orderWorker: { include: { worker: { include: { user: true } } } }
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
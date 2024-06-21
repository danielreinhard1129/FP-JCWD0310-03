import prisma from '@/prisma';
import { EmployeeStation, OrderStatus, PickupStatus } from '@prisma/client';

interface UpdateOrderWorkerBody {
    orderWorkerId: number,
    action: string
}
export const updateOrderWorkerService = async (
  body: UpdateOrderWorkerBody,
) => {
  try {
    const { action , orderWorkerId } = body;

    const orderWorker = await prisma.orderWorker.findFirst({
      where: { id: orderWorkerId },
      select: { bypassRequest: true }
    })

    if (!orderWorker) {
      throw new Error('Order Worker not Found!')
    }

    let requestAction = {}

    if(action == "accept"){
        requestAction = {
            bypassAccepted: true
        }
    }

    if(action == "reject"){
        requestAction = {
            bypassRejected: true,
            isComplete: true
        }
    }

    return await prisma.orderWorker.update({
      where: { id: orderWorkerId },
      data: requestAction,
    });

  } catch (error) {
    throw error;
  }
};
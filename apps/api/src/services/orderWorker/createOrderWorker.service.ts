import prisma from '@/prisma';
import { EmployeeStation, OrderStatus } from '@prisma/client';

interface CreateOrderWorkerBody {
    orderId: number,
    workerId: number,
    orderStatus: string
}
export const createOrderWorkerService = async (
  body: CreateOrderWorkerBody,
) => {
  try {
    const { orderId, workerId, orderStatus } = body;

    let station

    if(orderStatus == String(OrderStatus.BEING_WASHED)){
        station = EmployeeStation.WASHING
    }
    if(orderStatus == String(OrderStatus.BEING_IRONED)){
        station = EmployeeStation.IRONING
    }
    if(orderStatus == String(OrderStatus.BEING_PACKED)){
        station = EmployeeStation.PACKING
    }

    const updateStatusUpdate = await prisma.order.update({
        where: { id: orderId },
        data: {
            orderStatus: orderStatus as OrderStatus,
        },
    });

    const createOrderWorker = await prisma.orderWorker.create({
        data: { 
          orderId: orderId,
          workerId: workerId,
          station: station,
          bypassRequest: true
      },
      });

    return {
        order: updateStatusUpdate,
        orderWorker: createOrderWorker,
    }

  } catch (error) {
    throw error;
  }
};
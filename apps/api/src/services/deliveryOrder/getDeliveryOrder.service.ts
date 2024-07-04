import prisma from "@/prisma"

export const getDeliveryOrderService = async (id: number) => {
    try {
        const deliveryOrder = await prisma.deliveryOrder.findFirst({
            where: { id },
            include: { user: true, order: { include: { pickupOrder: { include: { outlet: { include: { address: true } } } } } }, address: true, driver: { include: { user: true } } },
        })

        if (!deliveryOrder) {
            throw new Error('Pickup Order Not Found')
        }

        return deliveryOrder;
    } catch (error) {
        throw error
    }
}
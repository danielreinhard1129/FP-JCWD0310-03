import prisma from "@/prisma";
import { Prisma } from "@prisma/client";

interface GetPaymentChartQuery {
    id: number;
    filterOutlet: string;
    filterMonth: string;
    filterYear: string;
}

export const getPaymentChartService = async (query: GetPaymentChartQuery) => {
    try {
        const { id, filterMonth, filterOutlet, filterYear } = query;

        const existingUser = await prisma.user.findFirst({
            where: { id: id },
            select: { employee: { select: { outlet: { select: { id: true } } } }, role: true }
        })

        if (!existingUser) {
            throw new Error('User not Found!')
        }      

        const whereClause: Prisma.PaymentWhereInput = {}

        if (existingUser.role != "SUPER_ADMIN") {
            const pickupOrders = await prisma.pickupOrder.findMany({
                where: { outletId: existingUser.employee?.outlet?.id },
                select: { id: true }
            })
    
            const pickupOrderIds = pickupOrders.map(pickup => pickup.id);
    
            const orders = await prisma.order.findMany({
                where: { pickupOrderId: { in: pickupOrderIds } },
                select: { id: true }
            })
    
            const orderIds = orders.map(order => order.id)
    
            whereClause.orderId = { in: orderIds }            
        } 

        const paymentChart = await prisma.payment.findMany({
            where: whereClause
        });

        return {
            data: paymentChart,
        };
    } catch (error) {
        throw error
    }
}
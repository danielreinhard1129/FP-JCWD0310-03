import { MIDTRANS_PUBLIC_CLIENT, MIDTRANS_SECRET } from '@/config';
import prisma from '@/prisma';
import { MidtransClient } from 'midtrans-node-client';

const snap = new MidtransClient.Snap({
  isProduction: false,
  clientKey: MIDTRANS_PUBLIC_CLIENT,
  serverKey: MIDTRANS_SECRET,
});

interface createPaymentArgs {
  orderId: number;
}

export const createPaymentService = async (
    body: createPaymentArgs,
) => {
    try {
        const { orderId } = body;

        const existingOrder = await prisma.order.findFirst({
            where: { id: orderId },
            include: { pickupOrder: true, deliveryOrder: true }
        });

        if (!existingOrder) {
            throw new Error('Order Not Found!');
        }

        if (!existingOrder.laundryPrice){
            throw new Error('Order Not Yet Process by Admin')
        }

        if (!existingOrder.deliveryOrder[0].deliveryPrice) {
            throw new Error('No Delivery Order Found!');
        }

        const amount = existingOrder.laundryPrice + existingOrder.pickupOrder.pickupPrice + existingOrder.deliveryOrder[0].deliveryPrice

        const padNumber = (num: number, size: number): string => {
            let s = num.toString();
            while (s.length < size) s = '0' + s;
            return s;
        };

        const orderNumberParts = existingOrder.orderNumber.split('-');
        const orderNumberPart = orderNumberParts.pop()

        const lastInvoice = await prisma.payment.findFirst({
            where: {
                invoiceNumber: {
                    contains: `INV-${padNumber(existingOrder.pickupOrder.userId,4)}-${orderNumberPart}-`
                }
            },
            orderBy: {
                invoiceNumber: 'desc'
            }
        });

        const getNextInvoiceNumber = (lastInvoice: { invoiceNumber: string } | null): string => {
            if (!lastInvoice) {
                return padNumber(1, 4);
            }

            const invoiceParts = lastInvoice.invoiceNumber.split('-');
            const lastPart = invoiceParts.pop();

            if (!lastPart) {
                throw new Error('Invalid invoice number format');
            }

            const lastNumber = parseInt(lastPart, 10);

            if (isNaN(lastNumber)) {
                throw new Error('Last part of the invoice number is not a valid number');
            }

            return padNumber(lastNumber + 1, 4);
        };

        const nextIncrement = getNextInvoiceNumber(lastInvoice);

        const invoiceNumber = `INV-${padNumber(existingOrder.pickupOrder.userId,4)}-${orderNumberPart}-${nextIncrement}`;

        const createPayment = await prisma.payment.create({
            data: {
                orderId: orderId,
                invoiceNumber: String(invoiceNumber),
                amount: amount,
            }
        })

        const token = await snap.createTransactionToken({
            transaction_details: {
                order_id: createPayment.invoiceNumber,
                gross_amount: amount
            }
        })

        const updatePaymentToken = await prisma.payment.update({
            where: { id: createPayment.id },
            data: { snapToken: token }
        })

        return updatePaymentToken
    } catch (error) {
        throw error;
    }
};

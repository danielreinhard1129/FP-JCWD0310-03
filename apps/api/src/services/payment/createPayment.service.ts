import { MIDTRANS_PUBLIC_CLIENT, MIDTRANS_SECRET } from '@/config';
import prisma from '@/prisma';
import { MidtransClient } from 'midtrans-node-client';


const snap = new MidtransClient.Snap({
    isProduction: false,
    clientKey: MIDTRANS_PUBLIC_CLIENT,
    serverKey: MIDTRANS_SECRET
})

interface createPaymentArgs {
    orderId: number
}

export const createPaymentService = async (
    body: createPaymentArgs,
) => {
    try {
        const { orderId } = body;

        const existingOrderId = await prisma.order.findFirst({
            where: { id: orderId },
            include: { pickupOrder: true, deliverOrder: true }
        });

        if (!existingOrderId) {
            throw new Error('Order Not Found!');
        }

        const Amount = existingOrderId.laundryPrice + (2 * existingOrderId.pickupOrder.pickupPrice)

        const currentMonth = new Date().getMonth() + 1;

        const lastInvoice = await prisma.payment.findFirst({
            where: {
                invoiceNumber: {
                    contains: `INV-${existingOrderId.pickupOrder.userId}-${currentMonth}-`
                }
            },
            orderBy: {
                invoiceNumber: 'desc'
            }
        });

        const padNumber = (num: number, size: number): string => {
            let s = num.toString();
            while (s.length < size) s = '0' + s;
            return s;
        };

        const getNextInvoiceNumber = (lastInvoice: { invoiceNumber: string } | null, paddingSize: number): string => {
            if (!lastInvoice) {
                return padNumber(1, paddingSize);
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

            return padNumber(lastNumber + 1, paddingSize);
        };


        const paddingSize = 4;
        const nextIncrement = getNextInvoiceNumber(lastInvoice, paddingSize);

        const invoiceNumber = `INV-${existingOrderId.pickupOrder.userId}-${currentMonth}-${nextIncrement}`;

        const createPayment = await prisma.payment.create({
            data: {
                orderId: orderId,
                invoiceNumber: String(invoiceNumber),
                amount: Amount,
            }
        })

        const token = await snap.createTransactionToken({
            transaction_details: {
                order_id: createPayment.invoiceNumber,
                gross_amount: Amount
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

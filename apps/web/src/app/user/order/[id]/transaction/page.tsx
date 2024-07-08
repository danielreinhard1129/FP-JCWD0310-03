'use client';
import { Button } from '@/components/ui/button';
import SkeletonTransactionPage from '@/app/user/components/SkeletonTransaction';
import { Separator } from '@/components/ui/separator';
import CustomerAuthGuard from '@/hoc/CustomerAuthGuard';
import useGetPayment from '@/hooks/api/payment/useGetPayment';
import { PaymentStatus } from '@/types/payment.type';
import { MIDTRANS_PUBLIC_CLIENT } from '@/utils/config';
import { format } from 'date-fns';
import { ChevronLeft, ScrollText } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'sonner';

const Transaction = ({ params }: { params: { id: string } }) => {
  const { data, refetch, isLoading } = useGetPayment({
    orderId: Number(params.id),
  });
  let formattedDate;
  let paymentMethode;
  if (data) {
    formattedDate = format(new Date(data?.createdAt), 'ccc, dd MMMM yyyy');
    if (data?.paymentMethode == 'credit_card') {
      paymentMethode = 'CREDIT CARD';
    }
    if (data?.paymentMethode == 'echannel') {
      paymentMethode = 'E CHANNEL';
    }
    if (data?.paymentMethode == 'bank_transfer') {
      paymentMethode = 'BANK TRANSFER';
    }
    if (data?.paymentMethode == 'bca_klikpay') {
      paymentMethode = 'BCA KLICKPAY';
    }
    if (data?.paymentMethode == 'bca_klikbca') {
      paymentMethode = 'BCA KLICKBCA';
    }
    if (data?.paymentMethode == 'bri_epay') {
      paymentMethode = 'BRI EPAY';
    }
    if (data?.paymentMethode == 'gopay') {
      paymentMethode = 'GOPAY';
    }
    if (data?.paymentMethode == 'qris') {
      paymentMethode = 'QRIS';
    }
    if (data?.paymentMethode == 'cstore') {
      paymentMethode = 'CS STORE';
    }
  }

  useEffect(() => {
    const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey = MIDTRANS_PUBLIC_CLIENT;

    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey || '');
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      if (!isLoading && data) {
        if (window.snap) {
          window.snap.pay(`${data.snapToken}`, {
            onSuccess: function (result: any) {
              toast.success('Payment success!');
              refetch()
            },
            onPending: function (result: any) {
              toast.success('Waiting for your payment!');
              refetch()
            },
            onError: function (result: any) {
              toast.success('Payment failed!');
              refetch()
            },
          });
        } else {
          alert('Snap is not loaded yet. Please try again.');
        }
      }
    } catch (error) {
      alert('Payment Error!');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  if (isLoading) {
    return <SkeletonTransactionPage />;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 container p-4 bg-white px-6">
        <div className="relative flex gap-2">
          <Link
            className="absolute h-6 my-auto"
            href={`/user/order/${params.id}`}
          >
            <ChevronLeft className="h-6 my-auto" />
          </Link>
          <h1 className="font-bold mx-auto my-auto">Transaction</h1>
        </div>
      </div>
      <div className="flex flex-col gap-4 container bg-mythemes-grey px-6 min-h-screen py-6">
        <div className="flex flex-col gap-4 p-6 rounded-xl shadow-lg bg-white">
          <ScrollText className="mx-auto h-10 w-10 text-mythemes-maingreen text-opacity-50" />
          <div className="flex flex-col">
            <p className="mx-auto text-md font-bold text-gray-500">INVOICE</p>
            <p className="mx-auto text-sm font-bold text-mythemes-maingreen">
              {data?.invoiceNumber}
            </p>
            <p className="mx-auto text-xs font-bold text-gray-500">
              Due on:
              {formattedDate}
            </p>
          </div>
          <div className="flex flex-col text-gray-700">
            <div className="flex justify-between">
              <p className="text-sm font-semibold">Order</p>
              <p className="text-sm ">{data?.order.orderNumber}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold">Name</p>
              <p className="text-sm">
                {' '}
                {data?.order.pickupOrder.user.fullName}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold">Email</p>
              <p className="text-sm ">{data?.order.pickupOrder.user.email}</p>
            </div>
          </div>
          <Separator />
          <div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p className="text-sm font-bold">Pickup Change</p>
                <p className="text-sm ">
                  {formatCurrency(Number(data?.order.pickupOrder.pickupPrice))}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Delivery Change</p>
                <p className="text-sm ">
                  {formatCurrency(Number(data?.order.pickupOrder.pickupPrice))}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Laundry Change</p>
              </div>
              <div className="pl-4 flex justify-between">
                <p className="text-xs font-medium my-auto">
                  {data?.order.weight}KG
                </p>
                <p className="text-xs font-medium my-auto">x</p>
                <p className="text-xs font-medium my-auto">IDR 6000/KG</p>
                <p className="text-sm ">
                  {formatCurrency(Number(data?.order.laundryPrice))}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold">Amount</p>
                <p className="text-sm font-bold text-mythemes-maingreen">
                  {formatCurrency(Number(data?.amount))}
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col">
            <div className="flex">
              <p className="text-sm w-2/4 font-semibold">Payment Methode :</p>
              <p className="text-sm w-2/4 font-bold text-mythemes-maingreen">
                {paymentMethode}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Status :</p>
              <div className="flex text-sm h-10 font-bold bg-mythemes-grey rounded text-mythemes-maingreen">
                <p className="my-auto mx-auto text-lg">{data?.paymentStatus}</p>
              </div>
            </div>
          </div>
        </div>
        {data?.paymentStatus != PaymentStatus.PENDING ? (
          <></>
        ) : (
          <Button
            onClick={handlePayment}
            className="bg-mythemes-maingreen text-white p-1 rounded-xl font-bold"
          >
            Pay
          </Button>
        )}
      </div>
    </div>
  );
};

export default CustomerAuthGuard(Transaction);

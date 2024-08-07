import FormInput from '@/components/FormInput';
import FormInputDisable from '@/components/FormInputDisable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import useUpdateOrderStatus from '@/hooks/api/order/useUpdateStatusOrder';
import useGetOrderItems from '@/hooks/api/orderItem/useGetOrderItems';
import useCreateOrderWorker from '@/hooks/api/orderWorker/useCreateOrderWorker';
import { OrderStatus } from '@/types/order.type';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormSelectDisable from '../../master/components/FormSelectDisable';
import ItemLaundryItemWithDeleted from '../../master/components/itemLaundryItemWithDeleted';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ItemCheckingDialogProps {
  workerId: number;
  orderId: number;
  targetStatus: string;
  isOpen: boolean;
  onClose: any;
  refetch: () => void;
}

const ItemCheckingDialog: React.FC<ItemCheckingDialogProps> = ({ isOpen, onClose, orderId, workerId, targetStatus, refetch }) => {
  const [formItems, setFormItems] = useState([{ id: 1 }]);
  const [requestAccess, setRequestAccess] = useState<boolean>(false);
  const [note, setNote] = useState<string>('')
  const router = useRouter()

  const { data: orderItems } = useGetOrderItems({
    orderId: orderId,
  });

  const values = {
    orderId: Number(orderId),
    workerId: Number(workerId),
    orderStatus: targetStatus as OrderStatus
  };

  const bypassValues = {
    orderId: Number(orderId),
    workerId: Number(workerId),
    orderStatus: targetStatus as OrderStatus,
    bypassNote: note
  };

  const { updateOrderStatus } = useUpdateOrderStatus();
  const { createOrderWorker } = useCreateOrderWorker();

  const handleUpdate = async () => {
    try {
      await updateOrderStatus(values);
      refetch();
      toast.success(`Claim Succeess!`);
      onClose();
      router.back();
    } catch (error) {
      console.error('Failed to update order status', error);
    }
  };

  const handleBypassRequest = async () => {
    try {
      await createOrderWorker(bypassValues);
      refetch();
      toast.success(`Sending Bypass Request Succeess!`);
      onClose();
      router.back();
    } catch (error) {
      console.error('Failed to create bypass request', error);
    }
  };
  
  const dynamicSchema = formItems.reduce((acc, item) => {
    acc[`laundryItemId_${item.id}`] = z.string({ required_error: "Required" }).min(1, "Required");
    acc[`qty_${item.id}`] = z.string({ required_error: "Required" }).min(1, "Required");
    acc[`check_qty_${item.id}`] = z.string({ required_error: "Required" }).min(1, "Required");
    return acc;
  }, {} as Record<string, z.ZodString>);

  const ValidationSchema = z.object({
    ...dynamicSchema,
  });

  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: "all",
    resolver: zodResolver(ValidationSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (orderItems) {
      const initialValues = orderItems.reduce((acc: any, orderItem, index) => {
        acc[`laundryItemId_${index + 1}`] = `${orderItem.laundryItemId}`;
        acc[`qty_${index + 1}`] = `${orderItem.qty}`;
        return acc;
      }, {});
      setFormItems(orderItems.map((_, index) => ({ id: index + 1 })));
      form.reset(initialValues);
    }
  }, [orderItems, form]);


  const handleSubmit = (data: any) => {
    const orderItem = formItems.map(item => ({
      laundryItemId: data[`laundryItemId_${item.id}`],
      qty: data[`qty_${item.id}`],
      check_qty: data[`check_qty_${item.id}`],
    }));

    const allQuantitiesMatch = orderItem.every(item => item.qty === item.check_qty);

    if (allQuantitiesMatch) {
      handleUpdate();
    } else {
      setNote("Laundry Item Does Not Match")
      setRequestAccess(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Check the order item</DialogTitle>
          <DialogDescription>
            <p>Before you can start, you must first check the order item.</p>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col bg-mythemes-grey px-4 pt-2 pb-4 rounded-md">
                {formItems.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-6/12">
                      <FormSelectDisable
                        name={`laundryItemId_${item.id}`}
                        label=""
                        placeholder="Select a Laundry Item"
                        form={form}
                        item={<ItemLaundryItemWithDeleted />}
                      />
                    </div>
                    <div className='w-3/12'>
                      <FormInputDisable
                        name={`qty_${item.id}`}
                        type="number"
                        label=""
                        placeholder="Entry Qty"
                        form={form}
                      />
                    </div>
                    <div className='w-3/12'>
                      <FormInput
                        name={`check_qty_${item.id}`}
                        type="number"
                        label=""
                        min={0}
                        placeholder="Entry Qty"
                        form={form}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {requestAccess === false ? (
              <div className='flex justify-end'>
                <Button className='bg-mythemes-maingreen' type="submit">Start Job</Button>
              </div>
            ) : (
              <div className='flex flex-col gap-3'>
                <p className='text-sm text-red-500'>Order item quantities do not match. You must bypass request to your outlet admin first!</p>
                <div className='flex justify-end'>
                  <button onClick={handleBypassRequest} className='bg-mythemes-maingreen font-bold text-md text-white w-1/2 p-0.5 rounded-md'>Bypass Request</button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ItemCheckingDialog;
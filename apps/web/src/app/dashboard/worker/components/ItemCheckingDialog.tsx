import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useGetOrderItems from '@/hooks/api/orderItem/useGetOrderItems';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import FormInput from '@/components/FormInput';
import FormSelect from '../../master/components/FormSelect';
import ItemLaundryItem from '../../master/components/ItemLaundryItem';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface ItemCheckingDialogProps {
  orderId: number;
  isOpen: boolean;
  onClose: () => void;
}
const ItemCheckingDialog: React.FC<ItemCheckingDialogProps> = ({ isOpen, onClose, orderId }) => {
  const [formItems, setFormItems] = useState([{ id: 1 }]);

  const { data: orderItems, refetch } = useGetOrderItems({
    orderId: orderId,
  });

  

  const dynamicSchema = formItems.reduce((acc, item) => {
    acc[`laundryItemId_${item.id}`] = z.string({ required_error: "Required" }).min(1, "Required");
    acc[`qty_${item.id}`] = z.string({ required_error: "Required" }).min(1, "Required");
    return acc;
  }, {} as Record<string, z.ZodString>);

  const ValidationSchema = z.object({
    ...dynamicSchema,
  });

  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: "all",
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
    }
  })

  const addFormLaundryItem = () => {
    setFormItems([...formItems, { id: formItems.slice(-1)[0].id + 1 }]);
  };

  const deleteFormLaundryItem = (id: number) => {
    if (formItems.length > 1) {
      setFormItems(formItems.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (data: any) => {
    const orderItem = formItems.map(item => ({
      laundryItemId: data[`laundryItemId_${item.id}`],
      qty: data[`qty_${item.id}`],
    }));
    // onSubmit(orderItem);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Check the order item.</DialogTitle>
          <DialogDescription>
            <h1>Before you can start, you must first check the order item.</h1>
            {/* {orderItems.map((orderItem, index) => {
              return (
                <h1 key={index}>{orderItem.laundryItem.itemName}-{orderItem.qty}</h1>
                )
                })} */}
          </DialogDescription>
        </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col bg-mythemes-grey px-4 pt-2 pb-4 rounded-md" >
                        {formItems.map((item, index) => (
                          <div key={index} className="flex gap-4 ">
                            <div className="w-3/4">
                              <FormSelect
                                name={`laundryItemId_${item.id}`}
                                label=""
                                placeholder="Select a Laundry Item"
                                form={form}
                                item={<ItemLaundryItem />}
                              />
                            </div>
                            <div>
                              <FormInput
                                name={`qty_${item.id}`}
                                type="number"
                                label=""
                                placeholder="Entry Qty"
                                form={form}
                              />
                            </div>
                            <div className="mt-2 flex items-center justify-center">
                              <div >
                                {formItems.length > 1 ? (
                                  <Trash2 onClick={() => deleteFormLaundryItem(item.id)} className="text-mythemes-maingreen cursor-pointer" />
                                ) : (
                                  <Trash2 className="text-mythemes-secondarygreen cursor-pointer" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div onClick={addFormLaundryItem} className="bg-mythemes-secondarygreen rounded-md mt-4 p-1 cursor-pointer">
                          <Plus className="text-mythemes-maingreen mx-auto" />
                        </div>
                      </div>
                    </div>
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ItemCheckingDialog
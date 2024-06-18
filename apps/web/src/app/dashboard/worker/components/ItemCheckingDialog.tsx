import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useGetOrderItems from '@/hooks/api/orderItem/useGetOrderItems';

interface ItemCheckingDialogProps {
  orderId: number;
  isOpen: boolean;
  onClose: () => void;
}
const ItemCheckingDialog: React.FC<ItemCheckingDialogProps> = ({ isOpen, onClose, orderId }) => {

  const { data: orderItems, refetch } = useGetOrderItems({
    orderId: orderId,
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            {orderItems.map((orderItem, index) => {
              return (
                <h1 key={index}>{orderItem.laundryItem.itemName}-{orderItem.qty}</h1>
              )
            })}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ItemCheckingDialog
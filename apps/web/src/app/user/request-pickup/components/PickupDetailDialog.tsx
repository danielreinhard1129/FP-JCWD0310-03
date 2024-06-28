import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useCreatePickupOrder from "@/hooks/api/pickupOrder/useCreatePickupOrder";



interface ItemCheckingDialogProps {
  outletId: number;
  userId: number;
  userAddressId: number;
  pickupPrice?: number;
  distance?: number;
  isOpen: boolean;
  onClose: () => void;

}

const PickupDetailDialog: React.FC<ItemCheckingDialogProps> = ({ isOpen, onClose, outletId, userAddressId, userId, distance, pickupPrice}) => {

  // const { data: orderItems } = useGetOrderItems({
  //   orderId: orderId,
  // });

  const values = {
    outletId: outletId,
    userId: userId,
    userAddressId: userAddressId,
    pickupPrice: pickupPrice,
    distance: distance,
  }

  const { createPickupOrder } = useCreatePickupOrder()

  const handleCreatePickupOrder = async () => {
    try {
      await createPickupOrder(values);
      onClose();
    } catch (error) {
      console.error('Failed to update pickup order', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make Sure Your Address</DialogTitle>
          <DialogDescription>
            <h1>Laundry with no pain, make sure your address to enjoy your life.</h1>
          </DialogDescription>
        </DialogHeader>
        <div className="h-60 bg-mythemes-secondarygreen rounded-xl"></div>
        <div className="flex justify-end">
        <button onClick={handleCreatePickupOrder} className=' bg-mythemes-maingreen font-bold text-sm text-white p-0.5 w-1/4 rounded-md' >Submit</button>
        </div>        
      </DialogContent>
    </Dialog>
  )
}

export default PickupDetailDialog
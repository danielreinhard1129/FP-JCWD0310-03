import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CustomerAuthGuard from '@/hoc/CustomerAuthGuard';
import useGetAddressById from '@/hooks/api/address/useGetAddressById';
import useGetOutlet from '@/hooks/api/outlet/useGetOutlet';
import useCreatePickupOrder from '@/hooks/api/pickupOrder/useCreatePickupOrder';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

interface ItemCheckingDialogProps {
  outletId: number;
  userId: number;
  userAddressId: number;
  pickupPrice?: number;
  distance?: number;
  isOpen: boolean;
  onClose: () => void;
}

const PickupDetailDialog: React.FC<ItemCheckingDialogProps> = ({
  isOpen,
  onClose,
  outletId,
  userAddressId,
  userId,
  distance,
  pickupPrice,
}) => {
  const values = {
    outletId: outletId,
    userId: userId,
    userAddressId: userAddressId,
    pickupPrice: pickupPrice,
    distance: Math.ceil(distance!),
  };

  const { createPickupOrder, isLoading } = useCreatePickupOrder();
  const { address, refetch } = useGetAddressById(userAddressId);
  const { outlet, refetch: refetcjOutlet } = useGetOutlet(outletId);

  useEffect(() => {
    refetch();
    refetcjOutlet();
  }, [outletId, userAddressId]);

  const handleCreatePickupOrder = async () => {
    try {
      await createPickupOrder(values);
      onClose();
    } catch (error) {
      console.error('Failed to update pickup order', error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle>Make Sure Your Address</DialogTitle>
          <DialogDescription>
            Laundry with no pain, make sure your address to enjoy your life.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col  border-2 border-mythemes-secondaryblue rounded-xl p-4 text-sm font-bold gap-2">
          <div className="flex flex-col justify-between border-b-2">
            <p className="mb-2">Your Address</p>
            <p className="font-normal">{address?.addressLine}</p>
          </div>
          <div className="flex flex-col justify-between border-b-2">
            <p className="mb-2">Outlet</p>
            <p className="font-normal mb-1">{outlet?.outletName}</p>
            <p className="font-normal">{outlet?.address[0].addressLine}</p>
          </div>
          <div className="flex justify-between border-b-2">
            <p>Distance</p>
            <p className="">:</p>
            <p>{distance} Km</p>
          </div>
          <div className="flex justify-between border-b-2">
            <p>Pickup Cost</p>
            <p className="mx-auto">:</p>{' '}
            <p>{formatCurrency(Number(pickupPrice))}</p>
          </div>
        </div>
        <p className="text-xs font-light">
          Note: <br />
          The pickup fee is Rp. 3,000 per kilometer, with a minimum distance of
          2 kilometers. If the distance is less than 2 kilometers, it will still
          count as 2 kilometers.
        </p>
        <div className="flex justify-end">
          <Button
            onClick={handleCreatePickupOrder}
            className=" bg-mythemes-maingreen font-bold text-sm text-white p-0.5 w-1/4 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className=" animate-spin" /> : 'Submit'}
            {isLoading ?? 'Success !'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerAuthGuard(PickupDetailDialog);

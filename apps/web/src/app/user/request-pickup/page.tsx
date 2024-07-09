'use client';
import EmptyAddress from '@/components/EmptyAddress';
import { Separator } from '@/components/ui/separator';
import CustomerAuthGuard from '@/hoc/CustomerAuthGuard';
import useGetOutletCoord from '@/hooks/api/outlet/useGetOutletCoord';
import useGetUserAddress from '@/hooks/api/user/useGetUserAddress';
import { useAppSelector } from '@/redux/hooks';
import haversine from 'haversine-distance';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TbTruckDelivery } from 'react-icons/tb';
import { toast } from 'sonner';
import ClosestLatLong from './components/ClosestLatLong';
import PickupDetailDialog from './components/PickupDetailDialog';
import SkeletonReqPickup from './components/SkeletonReqPickup';
import UserAddressList from './components/UserAddressList';
import { RiPinDistanceFill } from 'react-icons/ri';
interface AddressResult {
  latitude: string;
  longitude: string;
  addressLine: string;
  isPrimary: boolean;
  id: number;
}
interface Component {
  latitude: string;
  longitude: string;
  addressLine: string;
  id: number;
  outletId: number;
}
interface Data {
  address: Component[];
  outletName: string;
  id: number;
}

const RequestPickup = () => {
  const { id } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const { address, isLoading: isLoadingAddress } = useGetUserAddress();
  const [selectedOutlet, setSelectedOutlet] = useState<Data | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<AddressResult | null>(
    null,
  );
  const [pickupCost, setPickupCost] = useState<number | null>(null);
  const [pickupDistance, setPickupDistance] = useState<number | null>(null);
  const [realDistance, setRealDistance] = useState<number | null>(null);
  const { dataOutles, isLoading: isLoadingDataOutlet } = useGetOutletCoord();

  const handleAddressSelect = (address: AddressResult) => {
    setSelectedAddress(address);
  };
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleDialogOpen = () => {
    try {
      if (pickupDistance! > 3.5) {
        throw new Error('The distance between your address and the outlet address exceeds the maximum allowed distance of 3,5 km. Please select another outlet nearby.');
      }
      setIsDialogOpen(true);
    } catch (error) {
      toast.error(
        'The distance between your address and the outlet address exceeds the maximum allowed distance of 3,5 km. Please select another outlet nearby.',
      );
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  let outletCoord = {
    latitude: selectedOutlet?.address[0].latitude
      ? Number(selectedOutlet.address[0].latitude)
      : 0,
    longitude: selectedOutlet?.address[0].longitude
      ? Number(selectedOutlet.address[0].longitude)
      : 0,
  };

  let userCoord = {
    latitude: selectedAddress ? Number(selectedAddress.latitude) : 0,
    longitude: selectedAddress ? Number(selectedAddress.longitude) : 0,
  };

  useEffect(() => {
    if (selectedOutlet && selectedAddress) {
      const distanceInMeters = haversine(userCoord, outletCoord);
      const distanceInKm = Math.max(distanceInMeters / 1000, 2);
      const dist = distanceInMeters / 1000;
      const actualDist = Math.ceil(dist * 10) / 10;
      const finalDistance = Math.ceil(distanceInKm * 10) / 10;
      const cost = Math.ceil(finalDistance * 3000);
      setPickupDistance(finalDistance);
      setPickupCost(cost);
      setRealDistance(actualDist);
    }
  }, [selectedOutlet, selectedAddress]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <SkeletonReqPickup />;
  }

  if (address.length === 0) {
    return <EmptyAddress />;
  }
  return (
    <main className="relative p-0 pt-[32px]">
      <div className="flex flex-col gap-4 px-6 min-h-[740px]">
        <div className="flex relative">
          <ChevronLeft className="absolute" onClick={() => router.back()} />
          <div className="flex justify-between w-full">
            <h1 className="font-extrabold ml-8">Pickup Location</h1>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-3">
          <p className="font-bold">Your Pickup Address</p>
          <UserAddressList
            onAddressSelect={handleAddressSelect}
            address={address}
          />
        </div>
        {selectedAddress && (
          <div className="flex flex-col gap-4 mt-6">
            <p className="font-bold">Choose Your Nearest Outlet</p>
            <ClosestLatLong
              targetLocation={selectedAddress}
              dataOutles={dataOutles}
              selectedOutlet={selectedOutlet}
              setSelectedOutlet={setSelectedOutlet}
              realDistance={realDistance}
            />
          </div>
        )}
        {pickupCost && selectedOutlet && selectedAddress && (
          <div className="mt-auto bottom-0 border-t flex flex-col gap-3 border-l border-r h-40 place-content-end rounded-t-3xl px-6 py-4  ">
            <div className="flex flex-col gap-2 items-center border border-mythemes-maingreen bg-mythemes-maingreen bg-opacity-5 rounded-xl justify-center py-1">
              <div className="flex items-center w-[300px] justify-between">
                <div className="flex items-center">
                  <RiPinDistanceFill
                    size={20}
                    className="text-mythemes-secondaryblue"
                  />
                  <p className="mr-16 ml-2 text-sm font-bold">Distance :</p>
                </div>
                <p className="text-sm font-bold">
                  {Number(realDistance?.toFixed(1))} Km.
                </p>
              </div>
              <div className="flex items-center w-[300px] justify-between">
                <div className="flex items-center">
                  <TbTruckDelivery
                    size={20}
                    className="text-mythemes-secondaryblue"
                  />
                  <p className="mr-16 ml-2 text-sm font-bold">Pickup cost :</p>
                </div>
                <p className="text-sm font-bold">
                  {formatCurrency(Number(pickupCost))}{' '}
                </p>
              </div>
            </div>
            <div
              className="bg-mythemes-maingreen cursor-pointer text-white p-2 rounded-full text-center font-bold"
              onClick={handleDialogOpen}
            >
              Request Pickup
            </div>
            <PickupDetailDialog
              isOpen={isDialogOpen}
              onClose={handleDialogClose}
              outletId={selectedOutlet.id}
              userAddressId={selectedAddress.id}
              userId={Number(id)}
              distance={realDistance!}
              pickupPrice={pickupCost}
            />
          </div>
        )}
      </div>
    </main>
  );
};
export default CustomerAuthGuard(RequestPickup);

'use client';

import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import useGetOutlet from '@/hooks/api/outlet/useGetOutlet';
import useGetUserAddress from '@/hooks/api/user/useGetUserAddress';
import { useAppSelector } from '@/redux/hooks';
import { Outlet } from '@/types/outlet.type';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ClosestLatLong from './components/ClosestLatLong';
import UserAddressList from './components/UserAddressList';
import haversine from 'haversine-distance';
import { TbTruckDelivery } from 'react-icons/tb';
import CustomerAuthGuard from '@/hoc/CustomerAuthGuard';

interface AddressResult {
  latitude: string;
  longitude: string;
  addressLine: string;
  isPrimary: boolean;
  id: number;
}

const RequestPickup = () => {
  const { id } = useAppSelector((state) => state.user);
  const { address, isLoading: isLoadingAddress } = useGetUserAddress(id);
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [selectedOutletId, setSelectedOutletId] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<AddressResult | null>(
    null,
  );
  const [pickupCost, setPickupCost] = useState<number | null>(null);

  const handleAddressSelect = (address: AddressResult) => {
    setSelectedAddress(address);
  };

  const router = useRouter();

  const {
    outlet,
    isLoading: isLoadingOutlet,
    refetch,
  } = useGetOutlet(selectedOutletId ? selectedOutletId : -1);

  useEffect(() => {
    if (outlet) {
      setSelectedOutlet(outlet);
    }
  }, [outlet]);

  useEffect(() => {
    if (selectedOutletId !== null) {
      refetch();
    }
  }, [selectedOutletId]);

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
      const cost = Math.ceil(distanceInKm * 1500);
      setPickupCost(cost);
      console.log('Distance:', distanceInKm, 'Cost:', cost);
    }
  }, [selectedOutlet, selectedAddress]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  console.log('ini selected outlet:', selectedOutlet);
  console.log('ini selected outlet id', selectedOutletId);

  if (isLoadingAddress) {
    return <div>Loading addresses...</div>;
  }

  if (isLoadingOutlet) {
    return <div>Loading outlet...</div>;
  }

  return (
    <main className="relative container p-0 pt-[32px]">
      <div className="flex flex-col gap-4 px-6">
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
        <div className="flex flex-col gap-4 mt-6">
          <p className="font-bold">Choose Your Nearest Outlet</p>
          {selectedAddress && (
            <ClosestLatLong
              targetLocation={selectedAddress}
              onSelect={(id) => setSelectedOutletId(Number(id))}
              selectedOutletId={String(selectedOutletId)}
              setSelectedOutletId={(id) => setSelectedOutletId(Number(id))}
              refetch={refetch}
            />
          )}
        </div>
        <div>Selected outlet id : {selectedOutletId}</div>
        <div>Selected outlet : {selectedOutlet?.outletName}</div>
        <div>Selected outlet.id : {selectedOutlet?.id}</div>
      </div>
      {selectedOutletId !== null ? (
        <div className="mt-20 bottom-0 border-t flex flex-col gap-3 border-l border-r h-32 place-content-end rounded-t-3xl px-6 py-4 continue-button-container ">
          <div className="flex items-center border border-mythemes-maingreen bg-mythemes-maingreen bg-opacity-5 rounded-xl justify-center py-1">
            <TbTruckDelivery size={30} className="text-mythemes-maingreen" />
            <p className="mr-16 ml-2 text-sm font-bold">Pickup cost :</p>
            <p className="text-sm font-bold">
              {formatCurrency(Number(pickupCost))}{' '}
            </p>
          </div>
          <div className="bg-mythemes-maingreen text-white p-2 rounded-full text-center font-bold">
            Continue
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default CustomerAuthGuard(RequestPickup);

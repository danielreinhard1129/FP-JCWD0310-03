'use client';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@radix-ui/react-separator';
import { ChevronRight, MapPin } from 'lucide-react';
import { useState } from 'react';

interface AddressResult {
  latitude: string;
  longitude: string;
  addressLine: string;
  isPrimary: boolean;
  id: number;
}

const UserAddressList = ({ address, onAddressSelect }: any) => {
  const [selectedAddress, setSelectedAddress] = useState(address[0] || null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleAddressClick = (address: AddressResult) => {
    setSelectedAddress(address);
    onAddressSelect(address);
    setIsOpen(false);
  };

  return (
    <>
      <Sheet open={isOpen}>
        <SheetTrigger
          onClick={() => {
            handleOpen();
          }}
        >
          {/* PRIMARY ADDRESS CARD */}
          <div className="w-full h-20 p-2 border border-mythemes-maingreen bg-mythemes-maingreen bg-opacity-5 rounded-xl shadow-sm grid grid-cols-9 gap-3">
            <div className="place-content-center">
              <MapPin className="mx-auto text-mythemes-maingreen" />
            </div>
            <div className="col-span-7 place-content-center">
              <div className="flex flex-col gap-2">
                {selectedAddress && selectedAddress.isPrimary && (
                  <Badge className="w-fit text-gray-500" variant={'secondary'}>
                    Primary
                  </Badge>
                )}
                <p className="text-sm text-left line-clamp-1 font-bold text-gray-500">
                  {selectedAddress
                    ? selectedAddress.addressLine
                    : 'No address selected'}
                </p>
              </div>
            </div>
            <div className="place-content-center">
              <ChevronRight />
            </div>
          </div>
        </SheetTrigger>
        <SheetContent
          className="py-8 w-full h-1/2 rounded-t-3xl bg-white flex flex-col gap-4"
          side={'bottom'}
        >
          <h1 className="absolute font-extrabold ml-8 z-0">
            Choose Your Address
          </h1>
          <Separator className="border" />
          <ScrollArea>
            <div className="flex flex-col gap-3">
              {/* ADDRESS CARD */}
              {address.map((address: any, index: number) => (
                <div
                  key={address.id}
                  className="w-full h-20 p-2 border rounded-xl shadow-sm grid grid-cols-9 gap-3"
                  onClick={() => handleAddressClick(address)}
                >
                  <div className="place-content-center">
                    <MapPin className="mx-auto text-mythemes-maingreen" />
                  </div>
                  <div className="col-span-8 place-content-center">
                    <div className="flex flex-col gap-2">
                      {address.isPrimary === true ? (
                        <Badge
                          className="w-fit text-gray-500"
                          variant={'secondary'}
                        >
                          Primary
                        </Badge>
                      ) : null}
                      <p className="text-sm text-left line-clamp-1 font-bold text-gray-500">
                        {address.addressLine}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UserAddressList;
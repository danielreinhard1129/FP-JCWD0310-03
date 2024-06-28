// ini component closestlatlong

// 'use client';

// import React, { useState, useEffect } from 'react';
// import useGetOutletCoord from '@/hooks/api/outlet/useGetOutletCoord';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Label } from '@/components/ui/label';

// interface Location {
//   id: number;
//   latitude: string;
//   longitude: string;
//   addressLine: string;
//   outletName: string;
// }

// interface TargetLocation {
//   latitude: string;
//   longitude: string;
// }

// const closestLocations = (
//   targetLocation: TargetLocation,
//   locationData: Location[],
//   count: number = 3,
// ): Location[] => {
//   if (!locationData || locationData.length === 0) {
//     return [];
//   }

//   function vectorDistance(dx: number, dy: number): number {
//     return Math.sqrt(dx * dx + dy * dy);
//   }

//   function locationDistance(
//     location1: TargetLocation,
//     location2: Location,
//   ): number {
//     const dx = Number(location1.latitude) - Number(location2.latitude);
//     const dy = Number(location1.longitude) - Number(location2.longitude);

//     return vectorDistance(dx, dy);
//   }
//   const sortedLocations = [...locationData].sort((a, b) => {
//     const distanceA = locationDistance(targetLocation, a);
//     const distanceB = locationDistance(targetLocation, b);
//     return distanceA - distanceB;
//   });

//   return sortedLocations.slice(0, count);
// };

// interface ClosestLatLongProps {
//   targetLocation: TargetLocation;
//   onSelect: (id: string) => void;
//   selectedOutletId: string | null;
// }

// const ClosestLatLong: React.FC<ClosestLatLongProps> = ({
//   targetLocation,
//   onSelect,
//   selectedOutletId,
// }) => {
//   const { dataOutles, isLoading } = useGetOutletCoord();
//   const [locationData, setLocationData] = useState<Location[]>([]);
//   console.log(dataOutles);

//   useEffect(() => {
//     if (dataOutles && dataOutles.data) {
//       const formattedLocations: Location[] = dataOutles.data.flatMap((data) =>
//         data.address.map((address) => ({
//           id: Number(address.outletId),
//           latitude: address.latitude,
//           longitude: address.longitude,
//           addressLine: address.addressLine,
//           outletName: data.outletName,
//         })),
//       );
//       setLocationData(formattedLocations);
//     }
//   }, [dataOutles]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!locationData || locationData.length === 0) {
//     return <div>No locations found.</div>;
//   }

//   const closestLocationsList = closestLocations(
//     targetLocation,
//     locationData,
//     3,
//   );

//   if (!closestLocationsList || closestLocationsList.length === 0) {
//     return <div>No locations found.</div>;
//   }

//   return (
//     <div>
//       <RadioGroup value={selectedOutletId!} onValueChange={onSelect}>
//         {closestLocationsList.map((closest) => (
//           <div
//             className="w-full h-20 p-2 border rounded-xl place-items-center shadow-sm grid grid-cols-9 gap-7"
//             key={String(closest.id)}
//           >
//             <div className="col-span-1">
//               <RadioGroupItem
//                 value={String(closest.id)}
//                 id={String(closest.id)}
//               />
//             </div>
//             <div className="col-span-8 place-content-center">
//               <Label htmlFor={String(closest.id)}>
//                 <h1 className="text-gray-500 font-bold mb-2">
//                   {closest.outletName}
//                 </h1>
//                 <p className="text-xs text-left line-clamp-1 font-bold text-gray-500">
//                   {closest.addressLine}
//                 </p>
//                 <p>{Number(closest.id)}</p>
//               </Label>
//             </div>
//           </div>
//         ))}
//       </RadioGroup>
//     </div>
//   );
// };

// export default ClosestLatLong;


// ini componen user addreslist

// 'use client';
// import { Badge } from '@/components/ui/badge';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { Separator } from '@radix-ui/react-separator';
// import { ChevronRight, MapPin } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import page from '../../page';

// interface AddressResult {
//   latitude: string;
//   longitude: string;
//   addressLine: string;
//   isPrimary: boolean;
//   id: number;
// }

// const UserAddressList = ({ address, onAddressSelect }: any) => {
//   const [selectedAddress, setSelectedAddress] = useState(address[0] || null);

//   // useEffect(() => {
//   //   if (address && address.length > 0) {
//   //     setSelectedAddress(address[0]);
//   //     onAddressSelect(address[0]);
//   //   }
//   // }, [address, onAddressSelect]);

//   const handleAddressClick = (address: AddressResult) => {
//     setSelectedAddress(address);
//     onAddressSelect(address);
//   };

//   return (
//     <>
//       <Sheet>
//         <SheetTrigger>
//           {/* PRIMARY ADDRESS CARD */}
//           <div className="w-full h-20 p-2 border rounded-xl shadow-sm grid grid-cols-9 gap-3">
//             <div className="place-content-center">
//               <MapPin className="mx-auto text-mythemes-maingreen" />
//             </div>
//             <div className="col-span-7 place-content-center">
//               <div className="flex flex-col gap-2">
//                 {selectedAddress && selectedAddress.isPrimary && (
//                   <Badge className="w-fit text-gray-500" variant={'secondary'}>
//                     Primary
//                   </Badge>
//                 )}
//                 <p className="text-sm text-left line-clamp-1 font-bold text-gray-500">
//                   {selectedAddress
//                     ? selectedAddress.addressLine
//                     : 'No address selected'}
//                 </p>
//               </div>
//             </div>
//             <div className="place-content-center">
//               <ChevronRight />
//             </div>
//           </div>
//         </SheetTrigger>
//         <SheetContent
//           className="py-8 w-full h-1/2 rounded-t-3xl flex flex-col gap-4"
//           side={'bottom'}
//         >
//           <h1 className="absolute font-extrabold ml-8 z-0">
//             Choose Your Address
//           </h1>
//           <Separator className="border" />
//           <ScrollArea>
//             <div className="flex flex-col gap-3">
//               {/* ADDRESS CARD */}
//               {address.map((address: any, index: number) => (
//                 <div
//                   key={address.id}
//                   className="w-full h-20 p-2 border rounded-xl shadow-sm grid grid-cols-9 gap-3"
//                   onClick={() => handleAddressClick(address)}
//                 >
//                   <div className="place-content-center">
//                     <MapPin className="mx-auto text-mythemes-maingreen" />
//                   </div>
//                   <div className="col-span-8 place-content-center">
//                     <div className="flex flex-col gap-2">
//                       {address.isPrimary === true ? (
//                         <Badge
//                           className="w-fit text-gray-500"
//                           variant={'secondary'}
//                         >
//                           Primary
//                         </Badge>
//                       ) : null}
//                       <p className="text-sm text-left line-clamp-1 font-bold text-gray-500">
//                         {address.addressLine}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </ScrollArea>
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// };

// export default UserAddressList;


// ini page
// 'use client';
// import { Separator } from '@/components/ui/separator';
// import useGetUserAddress from '@/hooks/api/user/useGetUserAddress';
// import { useAppSelector } from '@/redux/hooks';
// import { ChevronLeft } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import ClosestLatLong from './components/ClosestLatLong';
// import UserAddressList from './components/UserAddressList';
// import useGetOutletCoord from '@/hooks/api/outlet/useGetOutletCoord';
// import useGetOutlet from '@/hooks/api/outlet/useGetOutlet';

// interface AddressResult {
//   latitude: string;
//   longitude: string;
//   addressLine: string;
//   isPrimary: boolean;
//   id: number;
// }

// interface Location {
//   id: number;
//   latitude: string;
//   longitude: string;
//   addressLine: string;
//   outletName: string;
// }

// const RequestPickup = () => {
//   const { id } = useAppSelector((state) => state.user);
//   const { address, isLoading } = useGetUserAddress(id);
//   const [selectedOutletId, setSelectedOutletId] = useState<string | null>(null);
//   const [selectedAddress, setSelectedAddress] = useState<AddressResult | null>(
//     null,
//   );


//   const handleAddressSelect = (address: AddressResult) => {
//     setSelectedAddress(address);
//     setSelectedOutletId(null); // Reset selected outlet when address changes
//   };

//   const router = useRouter();

//   const { outlet } = useGetOutlet(Number(selectedOutletId));
//   console.log('address outlet', outlet);

//   console.log('address user', selectedAddress);

//   return (
//     <main className="px-6 p-0 pt-[32px] bg-[#ffff]">
//       <div className="flex flex-col gap-4">
//         <div className="flex relative">
//           <ChevronLeft className="absolute" onClick={() => router.back()} />
//           <div className="flex justify-between w-full">
//             <h1 className="font-extrabold ml-8">Pickup Location</h1>
//           </div>
//         </div>
//         <Separator />
//         <div className="flex flex-col gap-3">
//           <p className="font-bold">Your Pickup Address</p>
//           <UserAddressList
//             onAddressSelect={handleAddressSelect}
//             address={address}
//           />
//         </div>
//         <div className="flex flex-col gap-4 mt-6">
//           <p className="font-bold">Choose Your Nearest Outlet</p>
//           {selectedAddress && (
//             <ClosestLatLong
//               targetLocation={selectedAddress}
//               onSelect={(id) => setSelectedOutletId(id)}
//               selectedOutletId={selectedOutletId}

//             />
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default RequestPickup;


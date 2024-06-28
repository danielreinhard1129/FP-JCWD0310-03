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
//   refetch: () => void;
//   setSelectedOutletId: (value: string) => void;
// }

// const ClosestLatLong: React.FC<ClosestLatLongProps> = ({
//   targetLocation,
//   onSelect,
//   selectedOutletId,
//   refetch,
//   setSelectedOutletId,
// }) => {
//   const { dataOutles, isLoading } = useGetOutletCoord();
//   const [locationData, setLocationData] = useState<Location[]>([]);
//   // console.log(dataOutles);

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

//   // useEffect(() => {
//   //   const index = dataOutles?.data.findIndex((outlet) => outlet.id === 5);
//   //   if (index != undefined) {
//   //     selectedOutlet(dataOutles?.data[index].address);
//   //     console.log('dari compp', dataOutles?.data[index].address);
//   //   }
//   // }, [onSelect]);

//   // useEffect(() => {
//   //   // Pastikan dataOutles.data tidak null atau undefined
//   //   if (dataOutles?.data) {
//   //     const selectedOutlet = dataOutles.data.find(outlet => outlet.id === onSelect);
//   //     if (selectedOutlet) {
//   //       // Lakukan sesuatu dengan selectedOutlet.id
//   //       console.log('Selected outlet ID:', selectedOutlet.id);
//   //     }
//   //   }
//   // }, [onSelect, dataOutles]);

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

//   // const handleChange = async (value: string) => {
//   //   await onSelect(String(value)), await setSelectedOutletId(value), refetch();
//   // };
//   const handleChange = async (value: string) => {
//     await onSelect(value);
//     setSelectedOutletId(String(value));
//     refetch();
//   };

//   if (!closestLocationsList || closestLocationsList.length === 0) {
//     return <div>No locations found.</div>;
//   }

//   return (
//     <div>
//       <RadioGroup value={selectedOutletId || ''} onValueChange={handleChange}>
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

'use client';

import React, { useState, useEffect } from 'react';
import useGetOutletCoord from '@/hooks/api/outlet/useGetOutletCoord';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Location {
  id: number;
  latitude: string;
  longitude: string;
  addressLine: string;
  outletName: string;
}

interface TargetLocation {
  latitude: string;
  longitude: string;
}

const closestLocations = (
  targetLocation: TargetLocation,
  locationData: Location[],
  count: number = 3,
): Location[] => {
  if (!locationData || locationData.length === 0) {
    return [];
  }

  function vectorDistance(dx: number, dy: number): number {
    return Math.sqrt(dx * dx + dy * dy);
  }

  function locationDistance(
    location1: TargetLocation,
    location2: Location,
  ): number {
    const dx = Number(location1.latitude) - Number(location2.latitude);
    const dy = Number(location1.longitude) - Number(location2.longitude);

    return vectorDistance(dx, dy);
  }

  const sortedLocations = [...locationData].sort((a, b) => {
    const distanceA = locationDistance(targetLocation, a);
    const distanceB = locationDistance(targetLocation, b);
    return distanceA - distanceB;
  });

  return sortedLocations.slice(0, count);
};

interface ClosestLatLongProps {
  targetLocation: TargetLocation;
  onSelect: (id: string) => void;
  selectedOutletId: string | null;
  refetch: () => void;
  setSelectedOutletId: (value: string) => void;
}

const ClosestLatLong: React.FC<ClosestLatLongProps> = ({
  targetLocation,
  onSelect,
  selectedOutletId,
  refetch,
  setSelectedOutletId,
}) => {
  const { dataOutles, isLoading } = useGetOutletCoord();
  const [locationData, setLocationData] = useState<Location[]>([]);

  useEffect(() => {
    if (dataOutles && dataOutles.data) {
      const formattedLocations: Location[] = dataOutles.data.flatMap((data) =>
        data.address.map((address) => ({
          id: Number(address.outletId),
          latitude: address.latitude,
          longitude: address.longitude,
          addressLine: address.addressLine,
          outletName: data.outletName,
        })),
      );
      setLocationData(formattedLocations);
    }
  }, [dataOutles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!locationData || locationData.length === 0) {
    return <div>No locations found.</div>;
  }

  const closestLocationsList = closestLocations(
    targetLocation,
    locationData,
    3,
  );

  const handleChange = async (value: string) => {
    await onSelect(value);
    setSelectedOutletId(String(value));
    refetch();
  };

  if (!closestLocationsList || closestLocationsList.length === 0) {
    return <div>No locations found.</div>;
  }

  return (
    <div>
      <RadioGroup value={selectedOutletId || ''} onValueChange={handleChange}>
        {closestLocationsList.map((closest) => (
          <div
            className="w-full h-20 p-2 border rounded-xl place-items-center shadow-sm grid grid-cols-9 gap-7"
            key={String(closest.id)}
          >
            <div className="col-span-1">
              <RadioGroupItem
                value={String(closest.id)}
                id={String(closest.id)}
              />
            </div>
            <div className="col-span-8 place-content-center">
              <Label htmlFor={String(closest.id)}>
                <h1 className="text-gray-500 font-bold mb-2">
                  {closest.outletName}
                </h1>
                <p className="text-xs text-left line-clamp-1 font-bold text-gray-500">
                  {closest.addressLine}
                </p>
                <p>{closest.id}</p>
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ClosestLatLong;

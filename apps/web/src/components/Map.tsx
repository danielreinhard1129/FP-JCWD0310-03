// 'use client';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useEffect, useState } from 'react';
// import {
//   MapContainer,
//   Marker,
//   Popup,
//   TileLayer,
//   useMapEvents,
// } from 'react-leaflet';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import useGetLocationByCoord from '@/hooks/api/getLocation/useGetLocationByCoord';

// L.Icon.Default.mergeOptions({
//   iconUrl: markerIcon.src,
//   iconRetinaUrl: markerIcon2x.src,
//   shadowUrl: markerShadow.src,
// });

// const MyMapComponent = () => {
//   const { getLocation, data } = useGetLocationByCoord();
//   const markerPosition: [number, number] = [-7.782984, 110.367035];
//   const [lat, setLat] = useState<number | null>(null);
//   const [lng, setLng] = useState<number | null>(null);
//   const [currentPosition, setCurrentPosition] = useState<
//     [number, number] | null
//   >(markerPosition);

//   // open cage

//   function MyComponent() {
//     const map = useMapEvents({
//       locationfound: (location) => {
//         console.log('location found:', location);
//         setCurrentPosition([location.latlng.lat, location.latlng.lng]);
//         map.flyTo(location.latlng, map.getZoom());
//       },

//       click: (location) => {
//         setLat(location.latlng.lat);
//         setLng(location.latlng.lng);
//         setCurrentPosition([location.latlng.lat, location.latlng.lng]);
//         console.log('ini dia', [location.latlng.lat, location.latlng.lng]);
//         console.log('ini dia', location);
//       },
//     });
//     return null;
//   }
//   useEffect(() => {
//     getLocation(lat, lng);
//     console.log('ini data dari komp', data.results);
//   }, [lat, lng]);

//   return (
//     <div className="h-96">
//       <MapContainer
//         center={markerPosition}
//         zoom={20}
//         scrollWheelZoom={false}
//         className="h-full w-full"
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <MyComponent />
//         <Marker position={currentPosition}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default MyMapComponent;

// // ini mantap juga
// 'use client';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useEffect, useState } from 'react';
// import {
//   MapContainer,
//   Marker,
//   Popup,
//   TileLayer,
//   useMapEvents,
// } from 'react-leaflet';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import useGetLocationByCoord from '@/hooks/api/getLocation/useGetLocationByCoord';

// L.Icon.Default.mergeOptions({
//   iconUrl: markerIcon.src,
//   iconRetinaUrl: markerIcon2x.src,
//   shadowUrl: markerShadow.src,
// });

// const MyMapComponent = () => {
//   const { getLocation, data } = useGetLocationByCoord();
//   const [currentPosition, setCurrentPosition] = useState<
//     [number, number] | null
//   >(null);

//   const markerPosition: [number, number] = [0, 0];
//   const [lat, setLat] = useState(markerPosition[0]);
//   const [lng, setLng] = useState(markerPosition[1]);

//   function MyComponent() {
//     useEffect(() => {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLat(latitude);
//           setLng(longitude);
//           setCurrentPosition([latitude, longitude]);
//           // getLocation(lat, lng);
//         },
//         (error) => {
//           console.error(error);
//           // Fallback to default location if unable to get current position
//           setCurrentPosition([lat, lng]);
//           // getLocation(lat, lng);
//         },
//       );
//     }, []);

//     const map = useMapEvents({
//       // locationfound: (location) => {
//       //   console.log('location found:', location);
//       //   setCurrentPosition([location.latlng.lat, location.latlng.lng]);
//       //   map.flyTo(location.latlng, map.getZoom());
//       // },

//       click: (location) => {
//         setLat(location.latlng.lat);
//         setLng(location.latlng.lng);
//         setCurrentPosition([location.latlng.lat, location.latlng.lng]);
//         console.log('ini dia', [location.latlng.lat, location.latlng.lng]);
//         console.log('ini dia', location);
//       },
//     });
//     return null;
//   }

//   useEffect(() => {
//     setCurrentPosition([lat, lng]);
//     getLocation(lat, lng);
//   }, [lat, lng]);

//   return (
//     <div className="h-96">
//       {currentPosition && (
//         <MapContainer
//           center={currentPosition}
//           zoom={25}
//           scrollWheelZoom={false}
//           className="h-full w-full"
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <MyComponent />
//           {currentPosition && (
//             <Marker position={currentPosition}>
//               <Popup>
//                 A pretty CSS3 popup. <br /> Easily customizable.
//               </Popup>
//             </Marker>
//           )}
//         </MapContainer>
//       )}
//     </div>
//   );
// };

// export default MyMapComponent;

// 'use client';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useEffect, useState } from 'react';
// import {
//   MapContainer,
//   Marker,
//   Popup,
//   TileLayer,
//   useMapEvents,
// } from 'react-leaflet';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import useGetLocationByCoord from '@/hooks/api/getLocation/useGetLocationByCoord';

// L.Icon.Default.mergeOptions({
//   iconUrl: markerIcon.src,
//   iconRetinaUrl: markerIcon2x.src,
//   shadowUrl: markerShadow.src,
// });

// const MyMapComponent = () => {
//   const [currentPosition, setCurrentPosition] = useState<
//     [number, number] | null
//   >(null);
//   const defaultPosition: [number, number] = [-7.782984, 110.367035];
//   const [lat, setLat] = useState(defaultPosition[0]);
//   const [lng, setLng] = useState(defaultPosition[1]);
//   const { data, getLocation } = useGetLocationByCoord(String(lat), String(lng));

//   function MyComponent() {
//     useMapEvents({
//       click: (location) => {
//         const { lat, lng } = location.latlng;
//         setLat(lat);
//         setLng(lng);
//         setCurrentPosition([lat, lng]);
//         // getLocation();
//         console.log('Clicked location:', [lat, lng]);
//       },
//     });
//     return null;
//   }

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         // setLat(latitude);
//         // setLng(longitude);
//         setCurrentPosition([latitude, longitude]);
//         // getLocation();
//       },
//       (error) => {
//         console.error(error);
//         // Fallback to default location if unable to get current position
//         setCurrentPosition(defaultPosition);
//         // getLocation();
//       },
//     );
//   }, []);

//   console.log('dataaaaaa', data?.results[0].formatted);
//   // console.log('ini data', data);

//   return (
//     <div className="h-96">
//       {currentPosition && (
//         <MapContainer
//           center={currentPosition}
//           zoom={20}
//           scrollWheelZoom={false}
//           className="h-full w-full"
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <MyComponent />
//           <Marker position={currentPosition}>
//             <Popup>
//               A pretty CSS3 popup. <br /> Easily customizable.
//             </Popup>
//           </Marker>
//         </MapContainer>
//       )}
//     </div>
//   );
// };

// export default MyMapComponent;

// // ini mantap
// ('use client');
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useEffect, useState } from 'react';
// import {
//   MapContainer,
//   Marker,
//   Popup,
//   TileLayer,
//   useMapEvents,
// } from 'react-leaflet';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import useGetLocationByCoord from '@/hooks/api/getLocation/useGetLocationByCoord';

// L.Icon.Default.mergeOptions({
//   iconUrl: markerIcon.src,
//   iconRetinaUrl: markerIcon2x.src,
//   shadowUrl: markerShadow.src,
// });

// const MyMapComponent = () => {
//   const defaultPosition: [number, number] = [-7.782984, 110.367035];
//   const [currentPosition, setCurrentPosition] = useState<
//     [number, number] | null
//   >(null);
//   const [lat, setLat] = useState(defaultPosition[0]);
//   const [lng, setLng] = useState(defaultPosition[1]);
//   const { data, isLoading } = useGetLocationByCoord(lat, lng);

//   function MyComponent() {
//     useMapEvents({
//       click: (location) => {
//         const { lat, lng } = location.latlng;
//         setLat(lat);
//         setLng(lng);
//         setCurrentPosition([lat, lng]);
//         console.log('Clicked location:', [lat, lng]);
//       },
//     });
//     return null;
//   }

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLat(latitude);
//         setLng(longitude);
//         setCurrentPosition([latitude, longitude]);
//       },
//       (error) => {
//         console.error(error);
//         // Fallback to default location if unable to get current position
//         setCurrentPosition(defaultPosition);
//         setLat(defaultPosition[0]);
//         setLng(defaultPosition[1]);
//       },
//     );
//   }, []);

//   // useEffect(() => {
//   //   if (currentPosition) {
//   //     setLat(currentPosition[0]);
//   //     setLng(currentPosition[1]);
//   //   }
//   // }, [currentPosition]);

//   console.log('data bos', data?.results[0].formatted);

//   return (
//     <div className="h-96">
//       {currentPosition && (
//         <MapContainer
//           center={currentPosition}
//           zoom={20}
//           scrollWheelZoom={false}
//           className="h-full w-full"
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <MyComponent />
//           <Marker position={currentPosition}>
//             <Popup>
//               {isLoading
//                 ? 'Loading location data...'
//                 : data?.results[0]?.formatted || 'No data available'}
//             </Popup>
//           </Marker>
//         </MapContainer>
//       )}
//     </div>
//   );
// };

// export default MyMapComponent;

'use client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import useGetLocationByCoord from '@/hooks/api/getLocation/useGetLocationByCoord';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const MyMapComponent = ({ onLocationSelect }: any) => {
  const { getLocation, data } = useGetLocationByCoord();
  const [currentPosition, setCurrentPosition] = useState<
    [number, number] | null
  >(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition([latitude, longitude]);
        getLocation(latitude, longitude);
      },
      (error) => {
        console.error(error);
        setCurrentPosition([0, 0]); // fallback to default location
      },
    );
  }, []);

  useEffect(() => {
    if (data && data.results.length > 0 && currentPosition) {
      const selectedLocation = data.results[0];
      onLocationSelect({
        addressLine: selectedLocation.formatted,
        city: selectedLocation.components.county,
        latitude: currentPosition[0],
        longitude: currentPosition[1],
      });
    }
  }, [data, currentPosition]);

  function MyComponent() {
    const map = useMapEvents({
      click: (location) => {
        const { lat, lng } = location.latlng;
        setCurrentPosition([lat, lng]);
        getLocation(lat, lng);
      },
    });

    return null;
  }

  return (
    <div className="h-96">
      {currentPosition && (
        <MapContainer
          center={currentPosition}
          zoom={15}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyComponent />
          {currentPosition && (
            <Marker position={currentPosition}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default MyMapComponent;

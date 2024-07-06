'use client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FC, useEffect, useState } from 'react';
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
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface CardMapProps {
  onLocationSelect: any;
}

const CardMap: FC<CardMapProps> = ({ onLocationSelect }) => {
  const { getLocation, data } = useGetLocationByCoord();
  const [currentPosition, setCurrentPosition] = useState<
    [number, number] | null
  >(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
          // getLocation(latitude, longitude);
        },
        (error) => {
          console.error(error);
          setCurrentPosition([0, 0]);
        },
      );
    }
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
  }, [data]);

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
    <>
      <Dialog>
        <DialogTrigger className="w-56 text-left text-mythemes-maingreen font-bold hover:underline">
          Set Location on Map
        </DialogTrigger>
        <DialogContent>
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardMap;

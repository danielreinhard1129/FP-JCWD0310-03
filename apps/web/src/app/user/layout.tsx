import CreatePickupButton from '@/components/CreatePickupButton';
import 'leaflet/dist/leaflet.css';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-[430px] mx-auto">
      <div className="min-h-screen ">{children}</div>
      <CreatePickupButton />
    </main>
  );
} 

import CreatePickupButton from '@/components/CreatePickupButton';
import React from 'react';
import { Footer } from '@/components/Footer';
import 'leaflet/dist/leaflet.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-[430px] mx-auto">
      <div className="min-h-screen">{children}</div>
      <CreatePickupButton />
    </main>
  );
}

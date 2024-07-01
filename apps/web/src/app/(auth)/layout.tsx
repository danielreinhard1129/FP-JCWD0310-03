import React from 'react';
import CreatePickupButton from '../../components/CreatePickupButton';
import { Footer } from '@/components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-[430px] mx-auto">
      <div className="min-h-screen">{children}</div>
    </main>
  );
}

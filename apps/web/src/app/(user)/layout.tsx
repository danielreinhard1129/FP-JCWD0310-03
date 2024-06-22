import CreatePickupButton from '@/components/CreatePickupButton';
import React from 'react';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-[430px] mx-auto">
      {children}
      <CreatePickupButton />
    </main>
  );
}

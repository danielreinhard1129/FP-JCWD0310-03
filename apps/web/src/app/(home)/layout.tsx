import CreatePickupButton from '@/components/CreatePickupButton';
import { Footer } from '@/components/Footer';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import Navbar from './components/Navbar';
import { Header } from '@/components/Header';



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" mx-auto ">
      <Navbar />
      {/* <Header /> */}
      <div className="min-h-screen ">{children}</div>
      <Footer />
    </main>
  );
}

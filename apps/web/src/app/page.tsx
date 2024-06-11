'use client';
/* eslint-disable react/no-unescaped-entities */
import AboutUs from '@/components/homePage/AboutUs';
import BrowseOutlet from '@/components/homePage/BrowseOutlet';
import CreatePickupButton from '@/components/homePage/CreatePickupButton';
import OurAdventages from '@/components/homePage/OurAdventages';
import Testimonials from '@/components/homePage/Testimonials';
import { PromotionCarousel } from '@/components/promotion/PromotionCarousel';

export default function Home() {
  return (
    <main className=" bg-[#f4f4f4] ">
      <section className=" flex flex-col gap-8  h-full py-6">
        {/* SEARCH */}
        <div className="container p-6">Search bar</div>

        {/* CARD PROMOTION
      - USE CAROUSEL */}
        <div className="container px-6">
          <label className="font-bold md:text-3xl">Promotion</label>
          <PromotionCarousel />
        </div>

        {/* BROWSE OUTLET */}
        <BrowseOutlet />

        {/* ABOUT US */}
        <AboutUs />

        {/* OUR ADVENTAGES */}
        <OurAdventages />

        {/* TESTIMONIAL */}
        <Testimonials />

        {/* BUTTON */}
        <CreatePickupButton />
      </section>
    </main>
  );
}

'use client';
import AboutUs from '@/components/homePage/AboutUs';
import BrowseOutlet from '@/components/homePage/BrowseOutlet';
import OurAdventages from '@/components/homePage/OurAdventages';
import Testimonials from '@/components/homePage/Testimonials';
import { PromotionCarousel } from '@/components/promotion/PromotionCarousel';
import Image from 'next/image';
import React from 'react';
import hero from '../../../public/kaitlyn-pixley-vpJ-Q16DKAg-unsplash.jpg';
import heromesin from '../../../public/kemeja putih.jpg';
import { Button } from '@/components/ui/button';
import '../page.module.css'; // Pastikan jalur ini sesuai dengan struktur proyek Anda;
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  return (
    <main>
      <div className="bg-hero bg-cover bg-center bg w-full md:h-screen">
        <div className="container flex flex-col place-content-center h-screen gap-6">
          <div className="font-black md:text-6xl text-4xl text-white text-center text-pretty text-background mt-72 mb-36 ">
            {' '}
            We Handle Your{' '}
            <span className="text-mythemes-taubmans">Laundry,</span>{' '}
            <br className="hidden md:block" />
            You Handle Your Life.
          </div>
          {/* <div className="flex flex-col"> */}
          <div>
            <p className=" text-white font-bold md:text-xl text-sm text-center md:w-[800px] mx-auto">
              Your Laundry, Our Care. Experience the ultimate convenience with
              our fast, reliable, and eco-friendly delivery service. Sit back,
              relax, and let us handle the dirty work, anytime, anywhere.
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              className=" mx-auto md:text-xl text-md bg-white text-mythemes-maingreen rounded-xl font-bold hover:bg-mythemes-secondarygreen"
              onClick={() => router.push('/user')}
            >
              Get Started
            </Button>
          </div>
          {/* </div> */}
        </div>
      </div>

      <div className="container my-5">
        <label className="font-bold md:text-3xl text-xl">Promotion</label>
        <PromotionCarousel />
      </div>

      <div className='flex flex-col gap-16 pb-10'>
        {/* ABOUT US */}
        <AboutUs />

        {/* OUR ADVENTAGES */}
        <OurAdventages />

        {/* BROWSE OUTLET */}
        {/* <BrowseOutlet /> */}

        {/* TESTIMONIAL */}
        <Testimonials />
      </div>
    </main>
  );
};

export default Home;

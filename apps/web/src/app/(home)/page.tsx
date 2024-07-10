'use client';
import AboutUs from '@/components/homePage/AboutUs';
import OurAdventages from '@/components/homePage/OurAdventages';
import Testimonials from '@/components/homePage/Testimonials';
import { PromotionCarousel } from '@/components/promotion/PromotionCarousel';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import '../page.module.css';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const hash = window.location.hash.substr(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);
  return (
    <main>
      <div
        className="bg-hero bg-cover bg-center bg w-full md:h-screen "
        id="home"
      >
        <div className="container flex flex-col place-content-center h-screen gap-6">
          <div className="font-bold md:text-6xl text-4xl text-white text-center text-pretty text-background mt-72 mb-36 ">
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
              className=" mx-auto md:text-xl text-md bg-white text-[#1A1F1F] rounded-xl font-bold hover:bg-mythemes-secondarygreen"
              onClick={() => router.push('/login')}
            >
              Get Started
            </Button>
          </div>
          {/* </div> */}
        </div>
      </div>

      <div className="px-6 my-5 z-0">
        <PromotionCarousel />
      </div>

      <div className="flex flex-col gap-16 pb-10">
        {/* ABOUT US */}
        <div id="about-us">
          <AboutUs />
        </div>

        {/* OUR ADVENTAGES */}
        <OurAdventages />

        {/* TESTIMONIAL */}
        <Testimonials />
      </div>
    </main>
  );
};

export default Home;

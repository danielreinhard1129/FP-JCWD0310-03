'use client';
/* eslint-disable react/no-unescaped-entities */
import AboutUs from '@/components/homePage/AboutUs';
import BrowseOutlet from '@/components/homePage/BrowseOutlet';
import OurAdventages from '@/components/homePage/OurAdventages';
import Testimonials from '@/components/homePage/Testimonials';
import { PromotionCarousel } from '@/components/promotion/PromotionCarousel';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
  };
  return (
    <>
      <section className=" container p-0 relative mx-auto  flex flex-col gap-8  py-14 bg-[#f4f4f4] ">
        {/* SEARCH */}
        <div className=" ">Search bar</div>

        {/* CARD PROMOTION
      - USE CAROUSEL */}
        <div className="container">
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
        {/* <CreatePickupButton /> */}
        <Button onClick={() => logout()}>Logout</Button>

        {/* <Header /> */}
      </section>
      {/* <Menu /> */}
    </>
  );
}

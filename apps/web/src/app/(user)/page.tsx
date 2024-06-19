'use client';
import Autocomplete from '@/components/AutoComplete';
import { Footer } from '@/components/Footer';
/* eslint-disable react/no-unescaped-entities */
import AboutUs from '@/components/homePage/AboutUs';
import BrowseOutlet from '@/components/homePage/BrowseOutlet';
import OurAdventages from '@/components/homePage/OurAdventages';
import Testimonials from '@/components/homePage/Testimonials';
import { PromotionCarousel } from '@/components/promotion/PromotionCarousel';
import useGetLocationByCoord from '@/hooks/api/getLocation/useGetLocationByCoord';
import useCreateAddressByCoord from '@/hooks/api/user/useCreateAddressByCoord';
import { useAppSelector } from '@/redux/hooks';
import { appConfig } from '@/utils/config';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import noPic from '../../../public/pictNotFound.jpeg';

export default function Home() {
  const { getLocation, data } = useGetLocationByCoord();
  const { createAddress } = useCreateAddressByCoord();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // useEffect(() => {
  //   window.navigator.geolocation.getCurrentPosition((position) => {
  //     const lat = String(position.coords.latitude);
  //     const lon = String(position.coords.longitude);
  //     setLatitude(lat);
  //     setLongitude(lon);
  //     getLocation(lat, lon);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (data.results.length) {
  //     createAddress(
  //       data.results[0].components.county,
  //       data.results[0].components.road,
  //     );
  //     console.log('ini datadata', data.results[0].components.county);
  //   }
  // }, [data]);

  const { id, profilePic, fullName } = useAppSelector((state) => state.user);
  const router = useRouter();
  return (
    <>
      <section className="p-0 container relative mx-auto flex flex-col gap-8 mb-5 bg-[#f9f9f9] ">
        <div className="px-6 bg-mythemes-maingreen text-white rounded-b-3xl py-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <p className=" text-xs">Current Location</p>
              <div className="flex gap-1 items-center mt-1 font-bold">
                <FaLocationDot />
                {/* {data.results[0].components.municipality},{' '}
                {data.results[0].components.county} */}
              </div>
            </div>
            <div>
              {!id ? (
                <p
                  onClick={() => router.push('/login')}
                  className="font-bold hover:text-mythemes-secondarygreen cursor-pointer"
                >
                  Login
                </p>
              ) : (
                <div className="flex flex-col">
                  <div
                    className="w-10 h-10 rounded-full border-2 my-auto justify-center relative overflow-hidden mx-auto "
                    onClick={() => router.push(`/profile/${id}`)}
                  >
                    <Image
                      alt="ProfilePict"
                      src={
                        profilePic
                          ? profilePic.includes('googleusercontent.com')
                            ? profilePic
                            : `${appConfig.baseURL}/assets/${profilePic}`
                          : noPic.src // Path to your default image
                      }
                      quality={80}
                      objectFit="cover"
                      fill
                      loading="lazy"
                      className="mx-auto"
                    />
                  </div>
                  <p className="font-bold">{fullName}</p>
                </div>
              )}
            </div>
          </div>
          {/* SEARCH */}

          <Autocomplete />
        </div>

        {/* CARD PROMOTION
      - USE CAROUSEL */}
        <div className="px-6">
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
      </section>
      {!id ? <Footer /> : null}

      {/* <Menu /> */}
    </>
  );
}

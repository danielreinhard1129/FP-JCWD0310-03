'use client';
/* eslint-disable react/no-unescaped-entities */
import BrowseOutlet from '@/components/homePage/BrowseOutlet';
import { PromotionCarousel } from '@/components/promotion/PromotionCarousel';
import CustomerAuthGuard from '@/hoc/CustomerAuthGuard';
import useGetLocationByCoord from '@/hooks/api/getLocation/useGetLocationByCoord';
import { useAppSelector } from '@/redux/hooks';
import { BASE_API_URL } from '@/utils/config';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import noPic from '../../../public/pictNotFound.jpeg';

const Home = () => {
  const [currentPosition, setCurrentPosition] = useState<[number, number]>();
  const { id, email, fullName, role, isVerify, profilePic, tokenExpiresIn } =
    useAppSelector((state) => state.user);
  const { getLocation, data } = useGetLocationByCoord();

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition([latitude, longitude]);
        getLocation(latitude, longitude);
      },
      (error) => {
        console.error(error);
        setCurrentPosition([0, 0]); // fallback to default location
      },
    );
  }, []);

  const router = useRouter();
  return (
    <>
      <section className="p-0 container relative mx-auto flex flex-col gap-8 mb-5  ">
        <div className="px-6 bg-mythemes-maingreen text-white rounded-b-3xl py-6 flex flex-col gap-4 h-28">
          <div className="flex justify-between items-center">
            <div>
              <p className=" text-xs">Current Location</p>
              <div className="flex gap-1 items-center mt-1 font-bold">
                <FaLocationDot />
                {data?.results[0].components.county}
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
                    onClick={() => router.push(`/user/profile`)}
                  >
                    <Image
                      alt="ProfilePict"
                      src={
                        profilePic
                          ? profilePic.includes('googleusercontent.com')
                            ? profilePic
                            : `${BASE_API_URL}/assets${profilePic}`
                          : noPic.src // Path to your default image
                      }
                      quality={80}
                      objectFit="cover"
                      fill
                      loading="lazy"
                      className="mx-auto"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* CARD PROMOTION - USE CAROUSEL */}
        <div className="container">
          <label className="font-bold md:text-3xl">Promotion</label>
          <PromotionCarousel />
        </div>
        {/* BROWSE OUTLET */}
        <BrowseOutlet />
      </section>
    </>
  );
};
export default CustomerAuthGuard(Home);

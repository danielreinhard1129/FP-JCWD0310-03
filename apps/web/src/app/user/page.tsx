'use client';
/* eslint-disable react/no-unescaped-entities */
import BrowseOutlet from '@/components/homePage/UserOrder';
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
import { PromotionCarousel } from './components/PromotionCarousel';
import SkeletonUser from './components/SkeletonUser';
import { format } from 'date-fns'; // If using date-fns
import { Bell } from 'lucide-react';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPosition, setCurrentPosition] = useState<[number, number]>();
  const { id, email, fullName, role, isVerify, profilePic, tokenExpiresIn } =
    useAppSelector((state) => state.user);
  const {
    getLocation,
    data,
    isLoading: getLocLoading,
  } = useGetLocationByCoord();

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition([latitude, longitude]);
        getLocation(latitude, longitude);
      },
      (error) => {
        console.error(error);
        setCurrentPosition([0, 0]);
      },
    );
  }, []);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonUser />;
  }
  
  const currentDate = format(new Date(), 'ccc, dd MMM yyyy');

  function capitalize(str: string) {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <>
      <section className="p-0 container relative mx-auto flex flex-col gap-8 mb-5  ">
        <div className="px-6 bg-gradient-green text-white rounded-b-3xl py-6 flex flex-col justify-between h-28">
          <div className="flex justify-between items-start h-20">
            <p className=" text-sm font-bold">{currentDate}</p>

            <div>
              {!id ? (
                <p
                  onClick={() => router.push('/login')}
                  className="font-bold hover:text-mythemes-secondarygreen cursor-pointer"
                >
                  Login
                </p>
              ) : (
                <div className="flex flex-col gap-4 items-center">
                  <div className=" bg-white/20 p-1 rounded-full">
                    <Bell
                      className="flex flex-col items-center gap-1 text-white cursor-pointer"
                      onClick={() => router.push(`/user/notification`)}
                      size={20}
                    />
                  </div>
                  {/* </div> */}
                  <p className="font-bold text-xs">{capitalize(fullName)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* CARD PROMOTION - USE CAROUSEL */}
        <div className="">
          <PromotionCarousel />
        </div>
        {/* BROWSE OUTLET */}
        <BrowseOutlet />
      </section>
    </>
  );
};
export default CustomerAuthGuard(Home);

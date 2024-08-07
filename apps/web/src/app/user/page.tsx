'use client';
/* eslint-disable react/no-unescaped-entities */
import UserOrder from '@/components/homePage/UserOrder';
import CustomerAuthGuard from '@/hoc/CustomerAuthGuard';
import useGetLocationByCoord from '@/hooks/api/getLocation/useGetLocationByCoord';
import { useAppSelector } from '@/redux/hooks';
import { format } from 'date-fns';
import 'leaflet/dist/leaflet.css';
import { Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PromotionCarousel } from './components/PromotionCarousel';
import SkeletonUser from './components/SkeletonUser';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPosition, setCurrentPosition] = useState<[number, number]>();
  const { id, fullName } = useAppSelector((state) => state.user);
  const {
    getLocation,
    data,
    isLoading: getLocLoading,
  } = useGetLocationByCoord();
  const router = useRouter();

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

  const currentDate = format(new Date(), 'ccc, dd MMM yyyy');

  function capitalize(str: string) {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <SkeletonUser />;
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
        <UserOrder />
      </section>
    </>
  );
};
export default CustomerAuthGuard(Home);

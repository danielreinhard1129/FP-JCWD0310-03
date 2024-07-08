'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import logo from '../../../../../public/Kucekin_K_White_Logo.png';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  BarChartBig,
  BookUser,
  ClipboardList,
  FileBarChart2,
  LogOut,
  Package,
  Shirt,
  Store,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';
import { Role } from '@/types/user.type';
import { Button } from '@/components/ui/button';
import { BASE_API_URL } from '@/utils/config';
import noPic from '../../../../../public/pictNotFound.jpeg';

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path);
  const isPageActive = (path: string) => pathname === path;
  const dispatch = useAppDispatch();
  const { id, role, fullName, profilePic } = useAppSelector(
    (state) => state.user,
  );
  const router = useRouter();
  const [isOrdersAccordionOpen, setIsOrdersAccordionOpen] = useState(false);
  const [isShipmentAccordionOpen, setIsShipmentAccordionOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
    router.push('/login');
  };

  const toggleOrdersAccordion = () => {
    setIsOrdersAccordionOpen(!isOrdersAccordionOpen);
  };
  const toggleShipmentAccordion = () => {
    setIsShipmentAccordionOpen(!isShipmentAccordionOpen);
  };

  return (
    <div className="flex flex-col gap-10 text-center text-white">
      <Link className="w-12 mx-auto mt-10" href={'/dashboard/master'}>
        <Image
          alt="Kucek.logo."
          src={logo}
          className="cursor-pointer"
          objectFit="contain"
        />
      </Link>
      <div className="flex flex-col text-md font-medium">
        <Link
          className={`flex gap-2 w-full h-12 px-10  ${isPageActive('/dashboard/master') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`}
          href={'/dashboard/master'}
        >
          <BarChartBig className="my-auto w-5 h-5" />
          <h2 className="my-auto">Overview</h2>
        </Link>
        <Link
          className={`flex gap-2 w-full h-12 px-10 ${role != Role.SUPER_ADMIN ? 'hidden' : 'block'} ${isActive('/dashboard/master/employee') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`}
          href={'/dashboard/master/employee'}
        >
          <BookUser className="my-auto w-5 h-5" />
          <h2 className="my-auto">Employees</h2>
        </Link>
        <div
          onClick={toggleOrdersAccordion}
          className={`flex gap-2 w-full h-12 px-10`}
        >
          <ClipboardList className="my-auto w-5 h-5" />
          <h2 className="my-auto cursor-pointer">Orders</h2>
        </div>
        {isOrdersAccordionOpen && (
          <div>
            <Link
              className={`flex gap-2 w-full h-12 pl-20 ${isActive('/dashboard/master/order') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`}
              href={'/dashboard/master/order'}
            >
              <h2 className="my-auto">Your Orders</h2>
            </Link>
            <Link
              className={`flex gap-2 w-full h-12 pl-20 ${isActive('/dashboard/master/bypass-request') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`}
              href={'/dashboard/master/bypass-request'}
            >
              <h2 className="my-auto">Bypass Request</h2>
            </Link>
            <Link
              className={`flex gap-2 w-full h-12 pl-20 ${isActive('/dashboard/master/delivery-request') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`}
              href={'/dashboard/master/delivery-request'}
            >
              <h2 className="my-auto">Delivery Request</h2>
            </Link>
          </div>
        )}
        <Link
          className={`flex gap-2 w-full h-12 px-10 ${role != Role.SUPER_ADMIN ? 'hidden' : 'block'} ${isActive('/dashboard/master/customer') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`}
          href={'/dashboard/master/customer'}
        >
          <BookUser className="my-auto w-5 h-5" />
          <h2 className="my-auto">Customers</h2>
        </Link>
        <Link
          className={`flex gap-2 w-full h-12 px-10 ${role != Role.SUPER_ADMIN ? 'hidden' : 'block'} ${isActive('/dashboard/master/outlet') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`}
          href={'/dashboard/master/outlet'}
        >
          <Store className="my-auto w-5 h-5" />
          <h2 className="my-auto">Outlets</h2>
        </Link>
        <div
          onClick={toggleShipmentAccordion}
          className={`flex gap-2 w-full h-12 px-10`}
        >
          <Package className="my-auto w-5 h-5" />
          <h2 className="my-auto cursor-pointer">Shipment</h2>
        </div>
        {isShipmentAccordionOpen && (
          <div>
            <Link
              className={`flex gap-2 w-full h-12 pl-20 ${isActive('/dashboard/master/pickup-order-tracking') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`}
              href={'/dashboard/master/pickup-order-tracking'}
            >
              <h2 className="my-auto">Pickup Order</h2>
            </Link>
            <Link
              className={`flex gap-2 w-full h-12 pl-20 ${isActive('/dashboard/master/delivery-order-tracking') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`}
              href={'/dashboard/master/delivery-order-tracking'}
            >
              <h2 className="my-auto">Delivery Order</h2>
            </Link>
          </div>
        )}
        <Link
          className={`flex gap-2 w-full h-12 px-10 ${role != Role.SUPER_ADMIN ? 'hidden' : 'block'} ${isActive('/dashboard/master/laundry-item') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`}
          href={'/dashboard/master/laundry-item'}
        >
          <Shirt className="my-auto w-5 h-5" />
          <h2 className="my-auto">Laundry Items</h2>
        </Link>
        <div className="absolute flex flex-col bottom-0 py-5 w-full gap-6 px-6">
          <div className=" flex flex-col items-center gap-1 ">
            <div className="w-10 h-10 rounded-full border-2 my-auto justify-center relative overflow-hidden mx-auto ">
              <Image
                alt="ProfilePict"
                src={
                  profilePic
                    ? profilePic.includes('googleusercontent.com')
                      ? profilePic
                      : `${BASE_API_URL}/assets${profilePic}`
                    : noPic.src
                }
                quality={80}
                objectFit="cover"
                fill
                loading="lazy"
                className="mx-auto"
              />
            </div>
            <div className="">
              <p>{fullName}</p>
              <p className="font-normal text-sm">
                {role == Role.SUPER_ADMIN ? 'Super Admin' : 'Outlet Admin'}
              </p>
            </div>
          </div>
          <Button
            onClick={logout}
            className="text-center mx-auto bg-white font-bold text-red-500 cursor-pointer flex gap-2 hover:bg-red-500 hover:text-white"
          >
            {' '}
            <p>Logout</p>
            <LogOut size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

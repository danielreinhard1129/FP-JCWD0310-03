'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import logo from '../../../../../public/Kucekin_K_White_Logo.png';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
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

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path);
  const dispatch = useAppDispatch();
  const { id, role } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [isOrdersAccordionOpen, setIsOrdersAccordionOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
    router.push('/login');
  };

  const toggleOrdersAccordion = () => {
    setIsOrdersAccordionOpen(!isOrdersAccordionOpen);
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

        <Link
          className={`flex gap-2 w-full h-12 px-10 ${isActive('/dashboard/master/shipment') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`}
          href={'/dashboard/master/shipment'}
        >
          <Package className="my-auto w-5 h-5" />
          <h2 className="my-auto">Shipment</h2>
        </Link>
        <Link
          className={`flex gap-2 w-full h-12 px-10 ${role != Role.SUPER_ADMIN ? 'hidden' : 'block'} ${isActive('/dashboard/master/laundry-item') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`}
          href={'/dashboard/master/laundry-item'}
        >
          <Shirt className="my-auto w-5 h-5" />
          <h2 className="my-auto">Laundry Items</h2>
        </Link>
        <Button
          onClick={logout}
          className="absolute bottom-3 py-5 px-10 text-center bg-white font-bold text-red-500 ml-11 cursor-pointer flex gap-2"
        >
          {' '}
          <p>Logout</p>
          <LogOut size={15} />
        </Button>
        {/* <div
          className="absolute bottom-0 w-full py-5 px-10 text-center font-bold text-red-500 bg-w flex gap-1 justify-center cursor-pointer"
          onClick={logout}
        >
          <p>Logout</p>
          <LogOut />
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;

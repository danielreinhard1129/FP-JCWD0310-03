'use client';
import Image from 'next/image';
import { Separator } from './ui/separator';
import logo from '../../public/Kucekin_Logo_K_EVO01.png';
import logo1 from '../../public/Kucekin_Logo_Black_EVO1.png';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { LogOut, Menu, User } from 'lucide-react';
import menu from '../../public/Kucekin_Logo_Black_EVO1.png';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/redux/slices/userSlice';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { id, role } = useAppSelector((state) => state.user);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
    router.push('/');
  };

  return (
    <>
      <div className=" sticky bg-white z-50 top-0">
        <div className="container mx-auto px-6 py-2 items-center flex justify-between">
          <div className="">
            <Image
              alt="Kucek.logo."
              src={logo}
              className="object-contain cursor-pointer md:hidden block"
              width={30}
              height={30}
            />
            <Image
              alt="Kucek.logo."
              src={logo1}
              className="object-contain cursor-pointer hidden md:block"
              width={100}
              height={100}
            />
          </div>
          
          {Boolean(id) ? (
            <div>
              <Sheet key="right">
                <SheetTrigger asChild>
                  <Menu className="h-7 w-7 text-main_green" />
                </SheetTrigger>
                <SheetContent
                  side={'right'}
                  className="w-full  bg-[#eeee] bg-opacity-80"
                >
                  <SheetHeader>
                    <SheetTitle className="mb-10 flex justify-center">
                      <Image
                        alt="Kucek.logo."
                        src={menu}
                        className="object-contain cursor-pointer"
                        width={100}
                      />
                    </SheetTitle>
                    <div className="grid gap-6">
                      <p className="text-xl font-bold  hover:text-main_green text-left cursor-pointer">
                        Profile
                      </p>
                      <p className="text-xl font-bold  hover:text-main_green text-left cursor-pointer">
                        Your Order
                      </p>
                      <p className="text-xl font-bold text-red-400 flex gap-1 cursor-pointer">
                        Logout <span></span> <LogOut />
                      </p>
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <div>
              <Button
                className="bg-white text-black font-bold h-8 hover:bg-secondary_green hover:border-b-0"
                onClick={() => router.push('/login')}
              >
                <User size={20} />
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
      <Separator />
    </>
  );
};

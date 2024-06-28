'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';
import { LogOut, Menu, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import menu from '../../../../public/Kucekin_Logo_Black_EVO1.png';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { id, role } = useAppSelector((state) => state.user);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
    router.push('/login');
  };

  return (
    <>
      <div className="relative w-full bg-white z-50">
        <div className="container mx-auto h-12 px-6 py-2 items-center flex justify-between md:justify-end">
          <div className='md:hidden block'>
            <Menu/>
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
                      <p
                        className="text-xl font-bold text-red-400 flex gap-1 cursor-pointer"
                        onClick={logout}
                      >
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
                className="bg-white text-black border border-gray-200 font-bold h-8 hover:bg-secondary_green hover:border-b-0"
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
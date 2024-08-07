'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';
import { LogOut, MenuIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../../../../public/Kucekin_Logo_White_EVO01.png';
import LogoutDialog from '@/components/LogoutDialog';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [navbarBg, setNavbarBg] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
    router.push('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 0) {
        setNavbarBg(true);
      } else {
        setNavbarBg(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`md:block hidden sticky top-0 `}>
        <div
          className={`left-0 h-14  absolute flex justify-between place-items-center container ${navbarBg ? 'bg-[#1A1F1F]' : ''} z-50 `}
        >
          <div className="w-28 ">
            <Image alt="logo" src={logo} />
          </div>
          <div className="flex gap-16 font-bold text-white text-lg ml-28">
            <a href="#home">Home</a>
            <a href="#about-us">About Us</a>
            <div
              className="cursor-pointer"
              onClick={() => router.push('/user')}
            >
              Go to apps
            </div>
          </div>
          <div className="flex gap-6 font-bold text-white text-xl">
            {Boolean(id) ? (
              <LogoutDialog />
            ) : (
              <>
                <Button
                  className="bg-transparent hover:bg-mythemes-secondarygreen hover:text-mythemes-maingreen font-bold text-white text-lg rounded-xl"
                  onClick={() => router.push('/login')}
                >
                  Sign in
                </Button>
                <Button
                  className="bg-mythemes-maingreen hover:bg-mythemes-secondarygreen hover:text-mythemes-maingreen font-bold text-white text-lg rounded-xl"
                  onClick={() => router.push('/register')}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden ">
        <div className="h-12 mt-3 absolute flex justify-between place-items-center container ">
          <div className="w-28">
            <Image alt="logo" src={logo} />
          </div>
          <div className="flex gap-6 font-bold text-white text-xl">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MenuIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-normal mr-6 text-right">
                <DropdownMenuItem>Home</DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#about-us">About Us</a>
                </DropdownMenuItem>
                <DropdownMenuItem>Services</DropdownMenuItem>
                <DropdownMenuSeparator />
                {Boolean(id) ? (
                  <DropdownMenuItem
                    className="font-bold flex gap-1 cursor-pointer text-red-500"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Log Out
                    <LogOut size={15} />
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem
                      className="text-mythemes-maingreen font-bold"
                      onClick={() => router.push('/register')}
                    >
                      Sign Up
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-bold"
                      onClick={() => router.push('/login')}
                    >
                      Sign In
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

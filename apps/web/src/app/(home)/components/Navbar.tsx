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

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
    router.push('/');
  };

  return (
    <>
      <div className="md:block hidden">
        <div className="h-12 mt-3 absolute flex justify-between place-items-center container ">
          <div className="w-28">
            <Image alt="logo" src={logo} />
          </div>
          <div className="flex gap-16 font-bold text-white text-lg">
            <div>Home</div>
            <div>About</div>
            <div>Feature</div>
          </div>
          <div className="flex gap-6 font-bold text-white text-xl">
            {Boolean(id) ? (
              <Button
                className="bg-transparent hover:bg-red-500  font-bold text-white text-lg rounded-xl"
                onClick={() => logout()}
              >
                Log Out
              </Button>
            ) : (
              <>
                <Button className="bg-transparent hover:bg-mythemes-secondarygreen hover:text-mythemes-maingreen font-bold text-white text-lg rounded-xl">
                  Sign in
                </Button>
                <Button className="bg-mythemes-maingreen hover:bg-mythemes-secondarygreen hover:text-mythemes-maingreen font-bold text-white text-lg rounded-xl">
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
                <DropdownMenuItem>About</DropdownMenuItem>
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
                    <DropdownMenuItem className="text-mythemes-maingreen font-bold">
                      Sign Up
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-bold">
                      Sign In
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent className="opacity-70 font-bold">
                <div className="text-3xl text-center">Menu</div>
                <div className="flex flex-col gap-6 mt-12 text-xl">
                  <div>Home</div>
                  <div>About Us</div>
                  <div>Features</div>
                </div>
              </SheetContent>
            </Sheet> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

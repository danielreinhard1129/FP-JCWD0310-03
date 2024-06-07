import Image from 'next/image';
import { Separator } from './ui/separator';
import logo from '../../public/Kucekin_Logo_K_EVO01.png';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import menu from '../../public/Kucekin_Logo_Black_EVO1.png';

export const Header = () => {
  return (
    <>
      <div className="fixed w-full left-0 top-0 bg-white z-50">
        <div className='container mx-auto px-6 py-2 items-center flex justify-between'>
          <div className="">
            <Image
              alt="Kucek.logo."
              src={logo}
              className="object-contain cursor-pointer"
              width={30}
              height={30}
            />
          </div>
          <div>
            <Sheet key="right">
              <SheetTrigger asChild>
                <Menu className="h-7 w-7" />
              </SheetTrigger>
              <SheetContent side={'right'} className="w-full">
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
                    <Button
                      variant={'ghost'}
                      className="flex justify-start hover:text-main_green"
                    >
                      <p className="text-xl font-bold">Profile</p>
                    </Button>
                    <Button
                      variant={'ghost'}
                      className="flex justify-start hover:text-main_green"
                    >
                      <p className="text-xl font-bold">Your Transaction</p>
                    </Button>
                    <Button
                      variant={'ghost'}
                      className="flex justify-start hover:text-main_green"
                    >
                      <p className="text-xl font-bold">Your Order</p>
                    </Button>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
};

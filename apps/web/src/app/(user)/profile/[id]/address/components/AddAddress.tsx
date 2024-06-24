'use client';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FormAddress from './FormAddAddress';

const AddAddress = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <Sheet open={isOpen}>
        <SheetTrigger onClick={() => setIsOpen(true)}>Add Address</SheetTrigger>
        <SheetContent className="py-8 w-full">
          <div className="flex flex-col gap-4  ">
            <div className="flex  relative">
              <ChevronLeft
                className="absolute"
                onClick={() => setIsOpen(false)}
              />
              <div className=" flex justify-between w-full">
                <h1 className=" font-extrabold ml-8">Add Address</h1>
              </div>
            </div>
            <Separator />
            <div>
              <FormAddress />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AddAddress;

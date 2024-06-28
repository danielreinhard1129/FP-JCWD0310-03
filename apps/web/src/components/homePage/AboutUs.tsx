import Image from 'next/image';
import React from 'react';
import image1 from '../../../public/Wash And Fold Laundry Service In Atlanta, GA _ Laundry Care.jpeg';
import { Separator } from '../ui/separator';

const AboutUs = () => {
  return (
    <>
      <div className=" bg-[#ffff] py-6 w-full px-6">
        <div className="flex flex-col md:grid md:grid-cols-2 ">
          <div className=" md:place-content-center md:flex md:flex-col md:gap-8">
            <p className="text-main_green text-xl font-bold text-left md:text-3xl mb-6">
              Why Kucekin?
            <div className='h-2 bg-mythemes-maingreen md:w-56 w-32 md:h-3 mb-2'></div>
            </p>
            <h1 className="text-6xl md:text-8xl font-bold text-left mb-2 ">
              Because life is too short to do <span className='text-mythemes-maingreen'>Laundry.</span> 
            </h1>
            <p className=" text-left  ">
              Kucekin has been delivering fresh, clean clothes since 2023. Enjoy
              hassle-free laundry with our convenient service, saving you time
              and effort. Experience the ease and reliability of Kucekin today.
            </p>
          </div>
          <div className=" rounded-xl overflow-hidden shadow-xl hidden md:block">
            <Image alt="image" src={image1} />
          </div>
        </div>
        <Separator className='mt-16 border-mythemes-maingreen  border-2'/>
      </div>
    </>
  );
};

export default AboutUs;

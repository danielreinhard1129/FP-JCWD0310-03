import Image from 'next/image';
import React from 'react';
import image1 from '../../../public/Wash And Fold Laundry Service In Atlanta, GA _ Laundry Care.jpeg';
import { Separator } from '../ui/separator';

const AboutUs = () => {
  return (
    <>
      <div className=" bg-[#ffff] py-6 w-full px-6 font-poppins md:h-screen md:place-content-center">
        <div className="flex flex-col md:grid md:grid-cols-2 ">
          <div className=" md:place-content-center md:flex md:flex-col md:gap-8">
            <p className="text-main_green text-xl font-bold text-left md:text-3xl mb-6">
              Why Kucekin?
            <div className='h-2 bg-mythemes-mainYellow md:w-56 w-32 md:h-3 mb-2'></div>
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
          <div className=" rounded-xl overflow-hidden hidden md:block md:mx-auto border-4">
            <Image alt="image" src={image1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

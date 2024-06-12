import Image from 'next/image';
import React from 'react';
import image1 from '../../../public/Wash And Fold Laundry Service In Atlanta, GA _ Laundry Care.jpeg';

const AboutUs = () => {
  return (
    <>
      <div className="flex flex-col gap-4 bg-[#ECE5C7]">
        <div className="container px-6 py-6 md:gap-4 md:flex md:flex-row">
          <div className="md:flex md:flex-col md:gap-7 md:w-[1000px]">
            <p className="text-main_green font-bold text-center md:text-left md:text-3xl">
              Why Kucekin?
            </p>
            <h1 className="text-2xl font-bold text-center md:text-8xl md:w-[700px] md:text-left">
              We Handle Your Laundry, You Handle Your Life.
            </h1>
            <p className=" text-center font-extralight md:font-normal md:w-[700px] md:text-left">
              Kucekin has been delivering fresh, clean clothes since 2023. Enjoy
              hassle-free laundry with our convenient service, saving you time
              and effort. Experience the ease and reliability of Kucekin today.
            </p>
          </div>
          <div className=" rounded-xl overflow-hidden shadow-xl hidden md:block">
            <Image alt="image" src={image1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

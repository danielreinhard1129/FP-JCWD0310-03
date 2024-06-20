import Image from 'next/image';
import React from 'react';
import image1 from '../../../public/Wash And Fold Laundry Service In Atlanta, GA _ Laundry Care.jpeg';

const AboutUs = () => {
  return (
    <>
      <div className=" bg-[#ECE5C7] py-6 w-full ">
        <div className="px-6 flex flex-col gap-4">
          <p className="text-main_green font-bold text-left md:text-3xl">
            Why Kucekin?
          </p>
          <h1 className="text-6xl font-bold text-left">
            We Handle Your Laundry, You Handle Your Life.
          </h1>
          <p className=" text-left font-extralight ">
            Kucekin has been delivering fresh, clean clothes since 2023. Enjoy
            hassle-free laundry with our convenient service, saving you time and
            effort. Experience the ease and reliability of Kucekin today.
          </p>
          <div className=" rounded-xl overflow-hidden shadow-xl hidden md:block">
            <Image alt="image" src={image1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

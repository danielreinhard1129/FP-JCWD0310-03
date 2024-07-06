import Image from 'next/image';
import React from 'react';
import detergentIcon from '../../../public/001-detergent.png';
import laundryIcon from '../../../public/002-washer.png';
import deliveryIcon from '../../../public/004-fast-delivery.png';
import timerIcon from '../../../public/005-timing.png';

const OurAdventages = () => {
  return (
    <main className="bg-mythemes-mainYellow py-28">
      <div className="container flex flex-col gap-4">
        <h1 className=" font-bold md:text-3xl text-2xl text-center">
          Here are <span className='text-mythemes-maingreen'>our advantages</span> expanded
        </h1>
        <p className="text-center md:w-[900px] md:mx-auto">
          At KUCEKIN, we handle your laundry with care, using eco-friendly
          materials. Count on us for reliable, on-time delivery. Experience
          exceptional service and sustainability with KUCEKIN.
        </p>
      </div>
      <div className=" container  md:grid md:grid-cols-4 md:gap-4 ">
        <div className="grid grid-cols-4 gap-4 mt-6 md:flex md:flex-col md:items-center">
          <div className="w-20 h-20 md:w-52 md:h-52 p-4   rounded-full md:place-content-center">
            <Image
              alt=""
              src={laundryIcon}
              className="mx-auto md:object-fill"
            />
          </div>

          <p className="text-sm md:text-md text-wrap col-span-3 text-left md:text-center place-content-center">
            Kucekin ensures meticulous cleaning with eco-friendly detergents for
            spotless clothes.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6 md:flex md:flex-col md:items-center ">
          <div className="w-20 h-20 md:w-52 p-4 md:h-52  rounded-full place-content-center">
            <Image
              alt=""
              src={detergentIcon}
              objectFit="contain"
              className="mx-auto"
            />
          </div>
          <p className="text-sm md:text-md text-wrap col-span-3 text-left md:text-center place-content-center">
            Kucekin uses eco-friendly detergents for safe, effective, and gentle
            cleaning.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6 md:flex md:flex-col md:items-center">
          <div className="w-20 h-20 md:w-52 p-4 md:h-52  rounded-full place-content-center">
            <Image
              alt=""
              src={timerIcon}
              objectFit="contain"
              className="mx-auto"
            />
          </div>
          <p className="text-sm md:text-md text-wrap col-span-3 text-left md:text-center place-content-center">
            Kucekin guarantees fast turnaround times for all your laundry needs.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6 md:flex md:flex-col md:items-center">
          <div className="w-20 h-20 md:w-52 p-4 md:h-52  rounded-full place-content-center">
            <Image
              alt=""
              src={deliveryIcon}
              objectFit="contain"
              className="mx-auto"
            />
          </div>
          <p className="text-sm md:text-md text-wrap col-span-3 text-left md:text-center place-content-center">
            Kucekin provides reliable, door-to-door delivery for your freshly
            cleaned clothes.
          </p>
        </div>
      </div>
    </main>
  );
};

export default OurAdventages;

import Image from 'next/image';
import React from 'react';
import detergentIcon from '../../../public/001-detergent.png';
import laundryIcon from '../../../public/002-washer.png';
import deliveryIcon from '../../../public/004-fast-delivery.png';
import timerIcon from '../../../public/005-timing.png';

const OurAdventages = () => {
  return (
    <>
      <div className="px-6">
        <div className="grid grid-cols-4 gap-4 mt-6 ">
          <div className="w-20 h-20  p-4  bg-mythemes-secondarygreen rounded-full md:place-content-center">
            <Image
              alt=""
              src={laundryIcon}
              className="mx-auto md:object-fill"
            />
          </div>

          <p className="text-sm text-wrap col-span-3 text-left place-content-center">
            Kucekin ensures meticulous cleaning with eco-friendly detergents for
            spotless clothes.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6 ">
          <div className="w-20 h-20  p-4  bg-mythemes-secondarygreen rounded-full md:place-content-center">
            <Image
              alt=""
              src={detergentIcon}
              className="mx-auto md:object-fill"
            />
          </div>

          <p className="text-sm text-wrap col-span-3 text-left place-content-center">
            Kucekin uses eco-friendly detergents for safe, effective, and gentle
            cleaning.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6 ">
          <div className="w-20 h-20  p-4  bg-mythemes-secondarygreen rounded-full md:place-content-center">
            <Image alt="" src={timerIcon} className="mx-auto md:object-fill" />
          </div>

          <p className="text-sm text-wrap col-span-3 text-left place-content-center">
            Kucekin guarantees fast turnaround times for all your laundry needs.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6 ">
          <div className="w-20 h-20  p-4  bg-mythemes-secondarygreen rounded-full md:place-content-center">
            <Image
              alt=""
              src={deliveryIcon}
              className="mx-auto md:object-fill"
            />
          </div>

          <p className="text-sm text-wrap col-span-3 text-left place-content-center">
            Kucekin provides reliable, door-to-door delivery for your freshly
            cleaned clothes.
          </p>
        </div>
        {/* <div className="grid grid-cols-4 gap-4 mt-6 md:flex md:flex-col md:items-center ">
          <div className="w-20 h-20 md:w-52 p-4 md:h-52 bg-mythemes-secondarygreen rounded-full place-content-center">
            <Image
              alt=""
              src={detergentIcon}
              objectFit="contain"
              className="mx-auto"
            />
          </div>
          <p className="text-sm md:text-lg text-wrap col-span-3 text-left md:text-center place-content-center">
            Kucekin uses eco-friendly detergents for safe, effective, and gentle
            cleaning.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6 md:flex md:flex-col md:items-center">
          <div className="w-20 h-20 md:w-52 p-4 md:h-52 bg-mythemes-secondarygreen rounded-full place-content-center">
            <Image
              alt=""
              src={timerIcon}
              objectFit="contain"
              className="mx-auto"
            />
          </div>
          <p className="text-sm md:text-lg text-wrap col-span-3 text-left md:text-center place-content-center">
            Kucekin guarantees fast turnaround times for all your laundry needs.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6 md:flex md:flex-col md:items-center">
          <div className="w-20 h-20 md:w-52 p-4 md:h-52 bg-mythemes-secondarygreen rounded-full place-content-center">
            <Image
              alt=""
              src={deliveryIcon}
              objectFit="contain"
              className="mx-auto"
            />
          </div>
          <p className="text-sm md:text-lg text-wrap col-span-3 text-left md:text-center place-content-center">
            Kucekin provides reliable, door-to-door delivery for your freshly
            cleaned clothes.
          </p>
        </div> */}
      </div>
    </>
  );
};

export default OurAdventages;

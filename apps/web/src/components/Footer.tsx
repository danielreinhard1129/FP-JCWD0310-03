import Image from 'next/image';
import logo from '../../public/Kucekin_Logo_White_EVO01.png';
import { Facebook, FacebookIcon, Instagram, Twitter } from 'lucide-react';
import { FaFacebookF } from 'react-icons/fa6';
import { BsTwitterX } from 'react-icons/bs';
import { GrInstagram } from 'react-icons/gr';

export const Footer = () => {
  return (
    <main className="bg-[#1A1F1F] container py-4 ">
      <div className=" text-white md:flex md:justify-between md:gap-4">
        {/* <div className=" mb-5 overflow-hidden "> */}
        <Image
          alt="Kucek.logo."
          src={logo}
          className="object-cover cursor-pointer"
          width={300}
        />
        {/* </div> */}
        <div className="md:flex md:gap-8 md:justify-normal ">
          <div className="md:flex md:flex-col font-light mb-5">
            <p className="md:mt-10">About Us</p>
            <p>Our Service</p>
            <p>Locations</p>
          </div>
          <div className="md:flex md:flex-col font-light mb-5">
            <h1 className="font-bold mb-3">Contact Us</h1>

            <p>021 8745507 (Jakarta)</p>
            <p>021 8745507 (Bandung)</p>
            <p>021 8745507 (Yogyakarta)</p>
            <p>021 8745507 (Surabaya)</p>
          </div>
          <div className="mx-auto md:flex md:flex-col gap-4 mb-5">
            <p className="font-bold">Follow Us</p>
            <div className="flex gap-4">
              <GrInstagram size={20} />
              <BsTwitterX size={20} />
              <FaFacebookF size={20} />
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-sm font-light text-white ">
        © 2024 Kucekin Laundry Delivery Service All Rights Reserved Owned by PT
        Berani Kotor Itu Baik
      </p>
    </main>
  );
};

import Image from 'next/image';
import logo from '../../public/Kucekin_Logo_White_EVO01.png';
import { Facebook, FacebookIcon, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <main className="bg-main_green container ">
      <div className=" text-white">
        <div className="flex place-content-center mb-5">
          <Image
            alt="Kucek.logo."
            src={logo}
            className="object-cover cursor-pointer"
            width={100}
          />
        </div>
        <div className="flex flex-col place-content-center font-light mb-5">
          <p>About Us</p>
          <p>Our Service</p>
          <p>Locations</p>
        </div>
        <div className="flex flex-col place-content-center font-light mb-5">
          <h1 className="font-bold mb-3">Contact Us</h1>
          <p>021 8745507 (Jakarta)</p>
          <p>021 8745507 (Bandung)</p>
          <p>021 8745507 (Yogyakarta)</p>
          <p>021 8745507 (Surabaya)</p>
        </div>
        <div className="mx-auto flex justify-center gap-2 md:gap-4 mb-5">
          <p className="font-bold">Follow Us</p>
          <Instagram />
          <Twitter />
          <Facebook />
        </div>
        <p className="text-center text-sm font-light">
          © 2024 Kucekin Laundry Delivery Service All Rights Reserved Owned by
          PT Berani Kotor Itu Baik
        </p>
      </div>
    </main>
  );
};

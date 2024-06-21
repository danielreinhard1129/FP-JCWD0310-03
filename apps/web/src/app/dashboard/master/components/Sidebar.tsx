import { BarChartBig, Store, Users, WashingMachine } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import poto from '../../../../../public/profile.jpg';
import { Separator } from '@/components/ui/separator';

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-8  text-center text-white">
      <div className="rounded-b-[60px] bg-mythemes-grey px-6 py-4 flex flex-col">
        <div className="w-28 h-28 mb-4 rounded-full border-4 border-mythemes-maingreen my-auto justify-center relative overflow-hidden mx-auto ">
          <Image
            alt="ProfilePict"
            src={poto}
            quality={80}
            objectFit="cover"
            fill
            loading="lazy"
            className="mx-auto"
          />
        </div>
        <h1 className=" font-bold text-center text-xl text-black">
          Christoper Handoyo
        </h1>
        <p className="text-black font-bold text-sm">Super Admin</p>
      </div>
      {/* <Link href={'/dashboard/master'}>
        <h1 className="text-3xl font-bold">MENU</h1>
      </Link> */}
      <div className="flex flex-col gap-11 px-6 text-left text-xl font-bold">
        <Link
          href={'/dashboard/master/employee'}
          className=" h-11 rounded-full place-content-center px-2 hover:bg-white hover:text-mythemes-maingreen  transition-all duration-200"
        >
          <h2 className="flex gap-4 hover:translate-x-10 transition-all duration-300">
            <Users />
            Employees
          </h2>
        </Link>
        <Link
          href={'/dashboard/master/order'}
          className=" h-11 rounded-full place-content-center px-2 hover:bg-white hover:text-mythemes-maingreen  transition-all duration-200"
        >
          <h2 className="flex gap-4 hover:translate-x-10 transition-all duration-300">
            <WashingMachine />
            Orders
          </h2>
        </Link>
        <Link
          href={'/dashboard/master/outlet'}
          className=" h-11 rounded-full place-content-center px-2 hover:bg-white hover:text-mythemes-maingreen  transition-all duration-200"
        >
          <h2 className="flex gap-4 hover:translate-x-10 transition-all duration-300">
            <Store />
            Outlets
          </h2>
        </Link>
        <Link
          href={'/dashboard/master'}
          className=" h-11 rounded-full place-content-center px-2 hover:bg-white hover:text-mythemes-maingreen  transition-all duration-200"
        >
          <h2 className="flex gap-4 hover:translate-x-10 transition-all duration-300">
            <BarChartBig />
            Report
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

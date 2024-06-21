'use client'
import Link from 'next/link'
import React from 'react'
import logo from '../../../../../public/Kucekin_K_White_Logo.png'
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { BookUser, ClipboardList, FileBarChart2, Store } from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname()
    const isActive = (path: string) => pathname.startsWith(path);
    return (
        <div className="flex flex-col gap-10 text-center text-white">
            <Link className='w-12 mx-auto mt-10' href={"/dashboard/master"}>
                <Image
                    alt="Kucek.logo."
                    src={logo}
                    className="cursor-pointer"
                    objectFit="contain"
                />
            </Link>
            <div className='flex flex-col text-md font-medium'>
                <Link className={`flex gap-2 w-full h-12 px-10 ${isActive('/dashboard/master/employee') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`} href={"/dashboard/master/employee"}>
                <BookUser className='my-auto w-5 h-5'/>
                    <h2 className='my-auto'>Employees</h2>
                </Link>
                <Link className={`flex gap-2 w-full h-12 px-10 ${isActive('/dashboard/master/order') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`} href={"/dashboard/master/order"}>
                <ClipboardList className='my-auto w-5 h-5'/>
                    <h2 className='my-auto'>Orders</h2>
                </Link>
                <Link className={`flex gap-2 w-full h-12 px-10 ${isActive('/dashboard/master/outlet') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`} href={"/dashboard/master/outlet"}>
                <Store className='my-auto w-5 h-5'/>
                    <h2 className='my-auto'>Outlets</h2>
                </Link>
                <Link className={`flex gap-2 w-full h-12 px-10 ${isActive('/dashboard/master/overview') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'text-white'}`} href={"/dashboard/master/overview"}>
                <FileBarChart2 className='my-auto w-5 h-5'/>
                    <h2 className='my-auto'>Overview</h2>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
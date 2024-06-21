'use client'

import { Bell, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const PickupNavbar = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path;

  return (
    <div className='flex flex-col gap-3 container bg-white px-6'>
      <div className='relative flex gap-2 mt-6'>
        <Link className='absolute h-6 my-auto' href={"/dashboard/driver"}>
          <ChevronLeft className='h-6 my-auto' />
        </Link>
        <h1 className='font-bold mx-auto my-auto'>Your Pickup</h1>
        <Bell className='absolute h-5 my-auto top-0.5 right-0' />
      </div>
      <div className='flex gap-2 text-center text-xs font-semibold justify-between'>
        <Link className={`w-1/4 rounded-t-xl p-1 active ${isActive('/dashboard/driver/pickup/request') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'bg-white text-mythemes-maingreen/60'}`} href={"/dashboard/driver/pickup/request"} >
          <h2 >Request</h2>
        </Link>
        <Link className={`w-1/4 rounded-t-xl p-1 active ${isActive('/dashboard/driver/pickup/collect') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'bg-white text-mythemes-maingreen/60'}`} href={"/dashboard/driver/pickup/collect"}>
          <h2>Collect</h2>
        </Link>
        <Link className={`w-1/4 rounded-t-xl p-1 active ${isActive('/dashboard/driver/pickup/pickup') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'bg-white text-mythemes-maingreen/60'}`} href={"/dashboard/driver/pickup/pickup"}>
          <h2>Pickup</h2>
        </Link>
        <Link className={`w-1/4 rounded-t-xl p-1 active ${isActive('/dashboard/driver/pickup/history') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'bg-white text-mythemes-maingreen/60'}`} href={"/dashboard/driver/pickup/history"}>
          <h2>History</h2>
        </Link>
      </div>
    </div>
  )
}

export default PickupNavbar
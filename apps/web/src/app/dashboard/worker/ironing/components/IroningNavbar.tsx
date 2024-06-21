'use client'

import { Bell, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const IroningNavbar = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path;

  return (
    <div className='flex flex-col gap-3 container bg-white px-6'>
      <div className='relative flex gap-2 mt-6'>
        <Link className='absolute h-6 my-auto' href={"/dashboard/worker"}>
          <ChevronLeft className='h-6 my-auto' />
        </Link>
        <h1 className='font-bold mx-auto my-auto'>Ironning Station</h1>
        <Bell className='absolute h-5 my-auto top-0.5 right-0' />
      </div>
      <div className='flex gap-2 text-center text-xs font-semibold justify-between'>
        <Link className={`w-1/3 rounded-t-xl p-1 active ${isActive('/dashboard/worker/ironing/request') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'bg-white text-mythemes-maingreen/60'}`} href={'/dashboard/worker/ironing/request'} >
          <h2 >Request</h2>
        </Link>
        <Link className={`w-1/3 rounded-t-xl p-1 active ${isActive('/dashboard/worker/ironing/ongoing') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'bg-white text-mythemes-maingreen/60'}`} href={'/dashboard/worker/ironing/ongoing'}>
          <h2>Ongoing</h2>
        </Link>
        <Link className={`w-1/3 rounded-t-xl p-1 active ${isActive('/dashboard/worker/ironing/history') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'bg-white text-mythemes-maingreen/60'}`} href={'/dashboard/worker/ironing/history'}>
          <h2>History</h2>
        </Link>
      </div>
    </div>
  )
}

export default IroningNavbar
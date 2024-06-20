import { Bell, UserCircle, UserRound } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const DriverDashboard = () => {
  return (
    <div className='min-h-screen flex flex-col gap-4 pt-6 bg-mythemes-grey container px-6'>
      <div className='overflow-hidden h-10 relative flex gap-2'>
        <div className='h-8 my-auto aspect-square rounded-full bg-mythemes-secondarygreen'></div>
        <div className='my-auto'>
          <h1 className='font-semibold text-xs text-gray-500'>Hello Anthony,</h1>
          <h1 className='font-bold text-sm '>Welcome Back!</h1>
        </div>
        <div className='absolute right-0 top-1 my-auto flex h-8 rounded-full border border-gray-400 px-2'>
          <Bell className='h-5 text-mythemes-maingreen my-auto' />
        </div>
      </div>
      <div className='h-40 bg-white rounded-xl shadow-md'></div>
      <div className='flex flex-col gap-2'>
        <h1 className='font-bold'>Your Jobs</h1>
        <div className='flex gap-3'>
          <Link className='flex w-1/2 h-16 bg-mythemes-secondarygreen rounded-xl shadow-md' href={"/dashboard/driver/pickup/request"}>            
              <h1 className='mx-auto my-auto font-bold text-gray-600'>Pickup</h1>            
          </Link>
          <Link className='flex w-1/2 h-16 bg-mythemes-taubmans rounded-xl shadow-md' href={"/dashboard/driver/delivery/request"}>
              <h1 className='mx-auto my-auto font-bold text-gray-600'>Delivery</h1>            
          </Link>
        </div>
      </div>

    </div>
  )
}

export default DriverDashboard
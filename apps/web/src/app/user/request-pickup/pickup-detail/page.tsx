'use client'
import React, { useState } from 'react'
import PickupDetailDialog from '../components/PickupDetailDialog';

const PickupDetail = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const outletId = 2
  const userAddressId = 30
  const userId = 55
  const distance = 10
  const pickupPrice = 25000

  return (
    <div className='container px-6 pt-6 min-h-screen flex flex-col gap-4'>
      <h1 className='text-center font-bold text-lg'>Pickup Request</h1>
      <div className='h-80 rounded-xl bg-mythemes-taubmans'></div>
      <div className='flex justify-center'>
      <button onClick={handleDialogOpen} className=' bg-mythemes-maingreen font-bold text-sm text-white p-0.5 w-1/4 rounded-md' >Request</button>
      </div>
      <PickupDetailDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        outletId={outletId}
        userAddressId={userAddressId}
        userId={userId}
        distance={distance}
        pickupPrice={pickupPrice}
      />
    </div>
  )
}

export default PickupDetail
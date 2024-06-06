import Link from 'next/link'
import React from 'react'

const MenuEmployee = () => {
  return (
    <div className='p-5'>
      <div className='flex justify-between mx-auto my-auto'>
        <div>
          <h1 className='font-bold text-xl'>Your Employees</h1>
        </div>
        <Link href={"/dashboard-super-admin/add-employee"}>
          <div className='bg-slate-800 px-4 rounded-lg my-auto'>
            <h1 className='text-white font-medium'>Add Employee</h1>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default MenuEmployee
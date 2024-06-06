import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <div className="flex flex-col gap-4 p-5 text-center">
            <Link href={"/dashboard-super-admin"}>
                <h1 className='text-xl font-bold'>MENU</h1>
            </Link>
            <div className='flex flex-col gap-4 text-md font-medium'>
                <Link href={"/dashboard-super-admin/menu-employee"}>
                    <h2>EMPLOYEES</h2>
                </Link>
                <Link href={"/dashboard-super-admin"}>
                    <h2>ORDER</h2>
                </Link>
                <Link href={"/dashboard-super-admin"}>
                    <h2>OUTLET</h2>
                </Link>
                <Link href={"/dashboard-super-admin"}>
                    <h2>REPORT & ANALYSIS</h2>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
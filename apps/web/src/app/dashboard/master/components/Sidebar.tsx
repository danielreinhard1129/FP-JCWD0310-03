import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <div className="flex flex-col gap-5 p-6 text-center text-white">
            <Link href={"/dashboard/master"}>
                <h1 className='text-xl font-bold'>MENU</h1>
            </Link>
            <div className='flex flex-col gap-4 text-md font-medium'>
                <Link href={"/dashboard/master/employee"}>
                    <h2>Employees</h2>
                </Link>
                <Link href={"/dashboard/master/order"}>
                    <h2>Orders</h2>
                </Link>
                <Link href={"/dashboard/master/outlet"}>
                    <h2>Outlets</h2>
                </Link>
                <Link href={"/dashboard/master"}>
                    <h2>Report & Analysis</h2>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
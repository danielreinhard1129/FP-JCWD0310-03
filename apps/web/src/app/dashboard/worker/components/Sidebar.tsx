import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <div className="flex flex-col gap-5 p-6 text-center text-white">
            <Link href={"/dashboard-super-admin"}>
                <h1 className='text-xl font-bold'>MENU</h1>
            </Link>
            <div className='flex flex-col gap-4 text-md font-medium'>
                <Link href={"/dashboard-worker"}>
                    <h2>Job Request</h2>
                </Link>
                <Link href={"/dashboard-worker"}>
                    <h2>Job Progresses</h2>
                </Link>
                <Link href={"/dashboard-worker"}>
                    <h2>Job History</h2>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
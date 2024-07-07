import Image from 'next/image'
import React from 'react'
import noAct from '../../../../public/No activity yet.png';

const NoData = () => {
  return (
    <div className=" flex flex-col place-content-center container gap-2 mt-40">
            <Image
              alt="logo"
              src={noAct}
              className="object-contain opacity-50"
              draggable="false"
            />
            <h1 className="text-center text-2xl font-bold text-gray-400">
              No Activity yet ...
            </h1>
          </div>
  )
}

export default NoData
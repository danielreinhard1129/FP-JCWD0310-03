import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import logo from '../../public/Kucekin_Logo_K_EVO01.png';
import logo1 from '../../public/Black Friday Typography Instagram Post.png';

const Loading = () => {
  return (
    <main>
      <div className="flex flex-col h-screen place-content-center items-center gap-4 ">
        <div className='animate-pulse'>
          <Image alt="logo" src={logo1} />
        </div>
      </div>
    </main>
  );
};

export default Loading;

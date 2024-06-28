// import Image from 'next/image';
// import logo from '../../public/002-washer.png';

// export default function NotFound() {
//   return (
//     <main className="bg-mythemes-secondarygreen w-screen h-screen p-10 place-content-center">
//       <div>
//         <p>You must not be here !</p>
//       </div>
//       <div className="flex">
//         <p className="font-black text-[500px]">4</p>
//         <Image alt="" src={logo} />
//         <p className="font-black text-[500px]">4</p>
//         <p>4</p>
//       </div>
//       <div>
//       <div>Back to home</div>
//       </div>
//     </main>
//   );
// }
'use client';

import Image from 'next/image';
import logo from '../../public/002-washer.png';
import { WashingMachine } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <main className=" w-screen h-screen p-10 place-content-center flex flex-col text-mythemes-maingreen">
      <div className="justify-center items-center mx-auto">
        <p className="font-black text-4xl">You must not be here!</p>
      </div>
      <div className="flex items-center mx-auto">
        <p className="font-black text-[400px]">4</p>
        {/* <Image alt="Logo" src={logo} className="w-80 h-80" /> */}
        <WashingMachine size={300} className='animate-bounce' />
        <p className="font-black text-[400px]">4</p>
      </div>
      <div
        className="mx-auto hover:bg-mythemes-maingreen hover:text-white cursor-pointer px-2 rounded-xl"
        onClick={() => router.push('/')}
      >
        <p className="text-xl font-black">Back to home</p>
      </div>
    </main>
  );
}

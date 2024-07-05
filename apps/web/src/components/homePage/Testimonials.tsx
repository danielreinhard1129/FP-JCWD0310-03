import React from 'react';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';

const Testimonials = () => {
  return (
    <>
      <div className="container text-[#1A1F1F] py-28">
        <h1 className=" font-bold text-2xl text-center mb-5 md:text-3xl">
          Happy Customer <span className="text-mythemes-mainYellow">Vibes</span> 
        </h1>
        <div>
          <ScrollArea className="whitespace-nowrap rounded-md  mx-auto">
            <div className="flex w-max space-x-4 md:mx-auto">
              <Card className="w-60 h-52 md:w-96 md place-content-center text-center rounded-xl py-2 bg-[#f4f4f4] shadow-md">
                <CardContent className="flex flex-col gap-2">
                  <p className="font-bold ">Christoper Handoyo</p>
                  <Separator className="border-black border" />
                  <p className=" font-extralight text-sm text-wrap">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical
                  </p>
                </CardContent>
              </Card>
              <Card className="w-60 h-52 md:w-96 md place-content-center text-center rounded-xl py-2 bg-[#f4f4f4] shadow-md">
                <CardContent className="flex flex-col gap-2">
                  <p className="font-bold ">Christoper Handoyo</p>
                  <Separator className="border-black border" />
                  <p className=" font-extralight text-sm text-wrap">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical
                  </p>
                </CardContent>
              </Card>
              <Card className="w-60 h-52 md:w-96 md place-content-center text-center rounded-xl py-2 bg-[#f4f4f4] shadow-md">
                <CardContent className="flex flex-col gap-2">
                  <p className="font-bold ">Christoper Handoyo</p>
                  <Separator className="border-black border" />
                  <p className=" font-extralight text-sm text-wrap">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical
                  </p>
                </CardContent>
              </Card>
              <Card className="w-60 h-52 md:w-96 md place-content-center text-center rounded-xl py-2 bg-[#f4f4f4] shadow-md">
                <CardContent className="flex flex-col gap-2">
                  <p className="font-bold ">Christoper Handoyo</p>
                  <Separator className="border-black border" />
                  <p className=" font-extralight text-sm text-wrap">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical
                  </p>
                </CardContent>
              </Card>
           
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default Testimonials;

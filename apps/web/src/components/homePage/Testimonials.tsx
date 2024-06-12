import React from 'react';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';

const Testimonials = () => {
  return (
    <>
      <div className="container p-6">
        <h1 className=" font-bold text-2xl md:text-4xl text-center">
          Happy <span className="text-main_green">Customer</span> Vibes
        </h1>
        <div>
          <ScrollArea className="whitespace-nowrap rounded-md  bg-[#f4f4f4]">
            <div className="flex w-max space-x-4 p-4">
              <Card className="w-60 md:w-[400px] h-52 md:h-[200px] place-content-center text-center rounded-xl py-2 bg-secondary_green shadow-md">
                <CardContent className="flex flex-col gap-2">
                  <p className="font-bold md:text-xl">Christoper Handoyo</p>
                  <Separator />
                  <p className=" font-extralight text-sm md:text-lg text-wrap">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical
                  </p>
                </CardContent>
              </Card>
              <Card className="w-60 md:w-[400px] h-52 md:h-[200px] place-content-center text-center rounded-xl py-2 bg-secondary_green shadow-md">
                <CardContent className="flex flex-col gap-2">
                  <p className="font-bold md:text-xl">Christoper Handoyo</p>
                  <Separator />
                  <p className=" font-extralight text-sm md:text-lg text-wrap">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical
                  </p>
                </CardContent>
              </Card>
              <Card className="w-60 md:w-[400px] h-52 md:h-[200px] place-content-center text-center rounded-xl py-2 bg-secondary_green shadow-md">
                <CardContent className="flex flex-col gap-2">
                  <p className="font-bold md:text-xl">Christoper Handoyo</p>
                  <Separator />
                  <p className=" font-extralight text-sm md:text-lg text-wrap">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical
                  </p>
                </CardContent>
              </Card>
              <Card className="w-60 md:w-[400px] h-52 md:h-[200px] place-content-center text-center rounded-xl py-2 bg-secondary_green shadow-md">
                <CardContent className="flex flex-col gap-2">
                  <p className="font-bold md:text-xl">Christoper Handoyo</p>
                  <Separator />
                  <p className=" font-extralight text-sm md:text-lg text-wrap">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical
                  </p>
                </CardContent>
              </Card>
              <Card className="w-60 md:w-[400px] h-52 md:h-[200px] place-content-center text-center rounded-xl py-2 bg-secondary_green shadow-md">
                <CardContent className="flex flex-col gap-2">
                  <p className="font-bold md:text-xl">Christoper Handoyo</p>
                  <Separator />
                  <p className=" font-extralight text-sm md:text-lg text-wrap">
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

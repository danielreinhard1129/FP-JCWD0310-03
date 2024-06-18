import React from 'react';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';

const Testimonials = () => {
  return (
    <>
      <div className="px-6">
        <h1 className=" font-bold text-2xl text-center mb-5">
          Happy <span className="text-mythemes-maingreen">Customer</span> Vibes
        </h1>
        <div>
          <ScrollArea className="whitespace-nowrap rounded-md ">
            <div className="flex w-max space-x-4">
              <Card className="w-60  h-52 place-content-center text-center rounded-xl py-2 bg-mythemes-taubmans shadow-md">
                <CardContent className="flex flex-col gap-2">
                  <p className="font-bold ">Christoper Handoyo</p>
                  <Separator />
                  <p className=" font-extralight text-sm text-wrap">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical
                  </p>
                </CardContent>
              </Card>
              <Card className="w-60  h-52 place-content-center text-center rounded-xl py-2 bg-mythemes-taubmans shadow-md">
                <CardContent className="flex flex-col gap-2">
                  <p className="font-bold ">Christoper Handoyo</p>
                  <Separator />
                  <p className=" font-extralight text-sm text-wrap">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical
                  </p>
                </CardContent>
              </Card>
              <Card className="w-60  h-52 place-content-center text-center rounded-xl py-2 bg-mythemes-taubmans shadow-md">
                <CardContent className="flex flex-col gap-2">
                  <p className="font-bold ">Christoper Handoyo</p>
                  <Separator />
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

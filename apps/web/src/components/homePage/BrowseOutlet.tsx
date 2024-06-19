import React from 'react';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Card, CardContent, CardHeader } from '../ui/card';
import Image from 'next/image';
import thumbnail from '../../../public/Kucekin_Logo_Black_EVO1.png';

const BrowseOutlet = () => {
  return (
    <>
      <div className="px-6">
        <div className="flex justify-between">
          <label className="font-bold md:text-3xl">Outlet</label>
          <label className="font-light text-main_green text-sm mt-auto underline cursor-pointer">
            View all
          </label>
        </div>

        <div className=" ">
          <ScrollArea className="whitespace-nowrap rounded-md">
            <div className="flex gap-4 ">
              <Card className="w-52 rounded-xl bg-white shadow-md">
                <CardHeader className="">
                  <Image alt="" src={thumbnail} />
                </CardHeader>
                <CardContent>
                  <p className="font-bold ">Kucekin Pogung baru</p>
                  <div>
                    <p className=" font-extralight text-sm -py">
                      Jogja <span className="border h-0 mr-1"></span>3.8km
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-52 rounded-xl bg-white shadow-md">
                <CardHeader className="">
                  <Image alt="" src={thumbnail} />
                </CardHeader>
                <CardContent>
                  <p className="font-bold ">Kucekin Pogung baru</p>
                  <div>
                    <p className=" font-extralight text-sm -py">
                      Jogja <span className="border h-0 mr-1"></span>3.8km
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-52 rounded-xl bg-white shadow-md">
                <CardHeader className="">
                  <Image alt="" src={thumbnail} />
                </CardHeader>
                <CardContent>
                  <p className="font-bold ">Kucekin Pogung baru</p>
                  <div>
                    <p className=" font-extralight text-sm -py">
                      Jogja <span className="border h-0 mr-1"></span>3.8km
                    </p>
                  </div>
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

export default BrowseOutlet;

'use client';
import useGetOutletList from '@/hooks/api/outlet/useGetOutletsList';
import { Card, CardContent } from '../ui/card';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { useState } from 'react';

const BrowseOutlet = () => {
  const [page, setPage] = useState(1);
  const { data: outlets } = useGetOutletList({
    page,
    take: 10,
    search: '',
  });
  return (
    <>
      <div className="px-6">
        <div className="flex justify-between mb-2">
          <label className="font-medium text-md">Outlet</label>
          <label className="font-light text-main_green text-sm mt-auto underline cursor-pointer">
            View all
          </label>
        </div>

        <div className=" ">
          <ScrollArea className="whitespace-nowrap rounded-md">
            <div className="flex gap-4 ">
              {outlets.map((outlet, idx) => (
                <Card
                  className="w-52 rounded-xl bg-white shadow-md pt-4"
                  key={idx}
                >
                  <CardContent>
                    <div>
                      <p className="font-medium ">{outlet.outletName}</p>
                      <p className=" font-extralight text-sm -py">
                        {outlet.address[0].city}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default BrowseOutlet;

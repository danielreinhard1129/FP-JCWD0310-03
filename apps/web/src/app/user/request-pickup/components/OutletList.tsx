import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Outlet } from '@/types/outlet.type';
import React, { FC } from 'react';

interface OutletProps extends Pick<Outlet, 'outletName' | 'id'> {}

const OutletList: FC<OutletProps> = ({ outletName, id }) => {
  return (
    <>
      {/* <RadioGroup defaultValue="comfortable"> */}
      <div className=" w-full h-20 p-2 border rounded-xl place-items-center shadow-sm grid grid-cols-9 gap-7">
        <div className=" col-span-1">
          <RadioGroupItem value={String(id)} id={String(id)} />
        </div>
        <div className="col-span-8">
          <Label htmlFor={String(id)}>
            <h1>{outletName}</h1>
            <p></p>
          </Label>
        </div>
      </div>
      {/* </RadioGroup> */}
    </>
  ); 
};

export default OutletList;

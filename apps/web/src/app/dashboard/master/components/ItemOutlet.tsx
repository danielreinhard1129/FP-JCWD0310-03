'use client'
import { SelectContent, SelectItem } from '@/components/ui/select';
import useGetOutletList from '@/hooks/api/outlet/useGetOutletsList';
import React, { useState } from 'react';

const ItemOutlet = () => {
  const [page, setPage] = useState(1);
  const { data: outlets } = useGetOutletList({ page, take: 1 });
  return (
    <SelectContent>
      {outlets.map((outlet, index) => {
        return (
          <SelectItem key={index} value={`${outlet.id}`}>
            {outlet.outletName}
          </SelectItem>
        );
      })}
    </SelectContent>
  );
};

export default ItemOutlet;

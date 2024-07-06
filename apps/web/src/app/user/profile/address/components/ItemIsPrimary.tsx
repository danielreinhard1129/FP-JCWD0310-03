'use client'
import { SelectContent, SelectItem } from '@/components/ui/select';
import React from 'react';

const ItemIsPrimary = () => {
  return (
    <SelectContent>
      <SelectItem value="true">Primary Address</SelectItem>
    </SelectContent>
  );
};

export default ItemIsPrimary;

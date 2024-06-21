import { SelectContent, SelectItem } from '@/components/ui/select';
import React from 'react';

const ItemOutletType = () => {
  return (
    <SelectContent>
      <SelectItem value="MAIN">Main outlet</SelectItem>
      <SelectItem value="BRANCH">Branch outlet</SelectItem>
    </SelectContent>
  );
};

export default ItemOutletType;

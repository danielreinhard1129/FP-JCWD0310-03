'use client';

import useGetOrders from '@/hooks/api/order/useGetOrders';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import AsyncSelect from 'react-select/async';

interface OrderOption {
  value: string;
  label: string;
}

interface ShipmentCardProps {
  id: number;
}

const OrderSearch: FC<ShipmentCardProps> = ({ id }) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const { data, isLoading } = useGetOrders({ search });
  const loadOptions = (
    inputValue: string,
    callback: (options: OrderOption[]) => void,
  ) => {
    try {
      const options = data.map((order) => {
        return {
          label: order.orderNumber,
          value: order.orderNumber,
        };
      });
      callback(options);
      setSearch(inputValue);
    } catch (error) {
      callback([]);
    }
  };
  const debouncedLoadOptions = debounce(loadOptions, 750);
  return (
    <AsyncSelect
      placeholder="Order Number"
      className="mx-auto my-4 max-w-[650px] text-black"
      loadOptions={debouncedLoadOptions}
      isLoading={isLoading}
    />
  );
};

export default OrderSearch;

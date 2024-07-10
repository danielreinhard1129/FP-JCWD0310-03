'use client';

import useGetOutletList from '@/hooks/api/outlet/useGetOutletsList';
import { BASE_URL } from '@/utils/config';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';

interface EventOption {
  value: number;
  label: string;
}

const Autocomplete = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const { data, isLoading } = useGetOutletList({
    search,
    take: 100,
  });

  const loadOptions = (
    inputValue: string,
    callback: (options: EventOption[]) => void,
  ) => {
    try {
      const options = data.map((event) => {
        return {
          label: event.outletName,
          value: event.id,
        };
      });
      callback(options);
      setSearch(inputValue);
    } catch (error) {
      callback([]);
    }
  };

  const debouncedLoadOptions = debounce(loadOptions, 2000);

  return (
    <AsyncSelect
      placeholder="Search for events"
      className="absolute w-full"
      loadOptions={debouncedLoadOptions}
      isLoading={isLoading}
      styles={{
        control: (styles) => ({
          ...styles,
          borderRadius: 10,
          backgroundColor: '#f1f1f1',
          borderColor: '#f1f1f1',
        }),
      }}
      onChange={(outlet) => {
        router.push(BASE_URL + `/${outlet?.value}`);
      }}
    />
  );
};

export default Autocomplete;

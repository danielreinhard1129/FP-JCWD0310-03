'use client';

import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CustomerAuthGuard from '@/hoc/CustomerAuthGuard';
import useGetOrders from '@/hooks/api/order/useGetOrders';
import { format } from 'date-fns';
import { debounce } from 'lodash';
import { CalendarIcon, ChevronLeft, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import OrderCard from './components/OrderCard';
import SkeletonOrder from '../components/SkeletonOrder';

const UserOrder = () => {
  const [page, setPage] = useState<number>(1);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [search, setSearch] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [filterCategory, setFilterCategory] = useState<string>('pickup');
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: orders,
    meta,
    refetch,
  } = useGetOrders({
    page,
    take: 10,
    search,
    filterDate: date,
    filterCategory,
    sortOrder: 'desc',
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const handleChangeFilterCategory = (value: string) => {
    setFilterCategory(value);
  };

  const handleSearch = debounce((value: string) => {
    setSearch(value);
  }, 1500);

  const clearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      handleSearch('');
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && (!date || selectedDate.getTime() !== date.getTime())) {
      setDate(selectedDate);
    }
    setPopoverOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <SkeletonOrder />;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 container pt-4 bg-white px-6">
        <div className="relative flex gap-2">
          <Link className="absolute h-6 my-auto" href={'/user/profile'}>
            <ChevronLeft className="h-6 my-auto" />
          </Link>
          <h1 className="font-bold mx-auto my-auto">Your Order</h1>
        </div>
        <div className="flex flex-col gap-2 pb-4">
          <div className={`flex gap-2`}>
            <div className="w-full relative">
              <X
                onClick={clearSearch}
                className={`cursor-pointer absolute right-2.5 bottom-1.5 h-5 w-5 text-mythemes-maingreen ${search == '' ? `hidden` : `block`}`}
              />
              <Input
                ref={inputRef}
                className="h-8"
                type="text"
                name="search"
                placeholder="Search Order No.."
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </div>
            <div className="flex relative">
              <X
                onClick={() => setDate(undefined)}
                className={`cursor-pointer absolute right-2 bottom-1.5 h-5 w-5 text-mythemes-maingreen ${date == undefined ? `hidden` : `block`}`}
              />
              <div className="flex flex-col">
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={`px-3 justify-start h-8 text-mythemes-maingreen ${date == undefined ? `` : `w-16`}`}
                      onClick={() => setPopoverOpen(true)}
                    >
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        handleDateSelect(selectedDate);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <div>
            <Select
              open={selectOpen}
              onOpenChange={setSelectOpen}
              name="category"
              onValueChange={handleChangeFilterCategory}
              defaultValue="pickup"
            >
              <SelectTrigger className="min-w-40 h-8">
                <SelectValue
                  placeholder="Status"
                  onClick={() => setSelectOpen(true)}
                />
              </SelectTrigger>
              <SelectContent onSelect={() => setSelectOpen(false)}>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pickup">On Pickup</SelectItem>
                <SelectItem value="process">On Process</SelectItem>
                <SelectItem value="delivery">On Delivery</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div> 
        </div>
      </div>
      <div className="min-h-dvh flex flex-col gap-2 pt-4 container px-6">
        <div className="flex flex-col gap-3">
          {orders.map((order, index) => {
            const formattedDate = format(
              new Date(order.createdAt),
              'dd-MM-yyyy',
            );
            return (
              <OrderCard
                key={index}
                orderId={order.id}
                orderNumber={order.orderNumber}
                orderStatus={order.orderStatus}
                isPaid={order.isPaid}
                createAt={formattedDate}
                refetch={refetch}
              />
            );
          })}
          <div className="flex justify-center content-center rounded-xl mb-2">
            <Pagination
              total={meta?.total || 0}
              take={meta?.take || 0}
              onChangePage={handleChangePaginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAuthGuard(UserOrder);

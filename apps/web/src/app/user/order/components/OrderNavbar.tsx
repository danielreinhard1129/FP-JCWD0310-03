'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useAppSelector } from '@/redux/hooks'
import { format } from 'date-fns'
import { debounce } from 'lodash'
import { Bell, CalendarIcon, ChevronLeft, SlidersHorizontal, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const OrderNavbar = () => {
  // const [page, setPage] = useState<number>(1);
  // const { id } = useAppSelector((state) => state.user);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>()
  const [search, setSearch] = useState<string>('')
  const [openSearch, setOpenSearch] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null);
  const [filterCategory, setFilterCategory] = useState<string>('')

  const toggleSearch = () => {
    setOpenSearch(prev => !prev);
  };

  const handleSearch = debounce((value: string) => {
    setSearch(value);
  }, 1500);

  const pathname = usePathname()
  const isActive = (path: string) => pathname === path;

  const clearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      handleSearch('');
    }
  };

  const handleChangeFilterStatus = (value: string) => {
    setFilterCategory(value)
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && (!date || selectedDate.getTime() !== date.getTime())) {
      setDate(selectedDate);
    }
    setPopoverOpen(false);
  };

  return (
    <div className='flex flex-col gap-4 container pt-4 bg-white px-6'>
      <div className='relative flex gap-2'>
        <Link className='absolute h-6 my-auto' href={"/user/profile"}>
          <ChevronLeft className='h-6 my-auto' />
        </Link>
        <h1 className='font-bold mx-auto my-auto'>Your Order</h1>
        <div className={`absolute flex h-6 right-0 my-auto p-0.5 rounded-md ${openSearch == false ? (``) : (`bg-slate-300`)}`}>
          <SlidersHorizontal onClick={toggleSearch} className={`cursor-pointer h-5 w-5 right-0 my-auto `} />
        </div>
      </div>
      {/* <div className={`flex gap-2 text-center text-xs font-semibold justify-between ${openSearch == true ? (`hidden`) : (`block`)}`}>
          <Link className={`w-1/4 rounded-t-xl p-1 active ${isActive('/user/order/on-pickup') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'bg-white text-mythemes-maingreen/60'}`} href={'/user/order/on-pickup'} >
            <h2 >On Pickup</h2>
          </Link>
          <Link className={`w-1/4 rounded-t-xl p-1 active ${isActive('/user/order/on-process') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'bg-white text-mythemes-maingreen/60'}`} href={'/user/order/on-process'}>
            <h2>On Process</h2>
          </Link>
          <Link className={`w-1/4 rounded-t-xl p-1 active ${isActive('/user/order/on-delivery') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'bg-white text-mythemes-maingreen/60'}`} href={'/user/order/on-delivery'}>
            <h2>On Delivery</h2>
          </Link>
          <Link className={`w-1/4 rounded-t-xl p-1 active ${isActive('/user/order/completed') ? ' bg-mythemes-grey text-mythemes-maingreen' : 'bg-white text-mythemes-maingreen/60'}`} href={'/user/order/completed'}>
            <h2>Completed</h2>
          </Link>
        </div> */}
      {/* <div className={`flex flex-col gap-2 pb-4 ${openSearch == false ? (`hidden`) : (`block`)}`}> */}
      <div className='flex flex-col gap-2 pb-4'>

        <div className={`flex gap-2`}>
          <div className='w-full relative'>
            <X
              onClick={clearSearch}
              className={`cursor-pointer absolute right-2.5 bottom-1.5 h-5 w-5 text-mythemes-maingreen ${search == '' ? (`hidden`) : (`block`)}`}
            />
            <Input
              ref={inputRef}
              className='h-8'
              type='text'
              name="search"
              placeholder="Search Order No.."
              onChange={(e) => { handleSearch(e.target.value) }}

            />
          </div>
          <div className='flex relative'>
            <X
              onClick={() => setDate(undefined)}
              className={`cursor-pointer absolute right-2 bottom-1.5 h-5 w-5 text-mythemes-maingreen ${date == undefined ? (`hidden`) : (`block`)}`}
            />
            <div className='flex flex-col'>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`px-3 justify-start h-8 text-mythemes-maingreen ${date == undefined ? (``) : (`w-16`)}`}
                    // className={cn(
                    //   "justify-start text-left font-normal",
                    //   !date && "text-muted-foreground"
                    // )}
                    onClick={() => setPopoverOpen(true)}
                  >
                    <CalendarIcon className="h-4 w-4" />
                    {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
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
          <Select name='category' onValueChange={handleChangeFilterStatus} defaultValue='all'>
            <SelectTrigger className='min-w-40 h-8'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
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
  )
}

export default OrderNavbar
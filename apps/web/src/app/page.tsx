'use client';

/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAppSelector } from '@/redux/hooks';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import detergentIcon from '../../public/001-detergent.png';
import laundryIcon from '../../public/002-washer.png';
import deliveryIcon from '../../public/004-fast-delivery.png';
import timerIcon from '../../public/005-timing.png';
import thumbnail from '../../public/Kucekin_Logo_Black_EVO1.png';
import image1 from '../../public/Wash And Fold Laundry Service In Atlanta, GA _ Laundry Care.jpeg';
import { PromotionCarousel } from '@/components/promotion/PromotionCarousel';


export default function Home() {
  const { id } = useAppSelector((state) => state.user);
  const router = useRouter();
  return (
    <main className=" bg-[#f4f4f4] ">
      <section className=" flex flex-col gap-8  h-full py-6">
        {/* SEARCH */}
        <div className="container p-6">Search bar</div>

        {/* CARD PROMOTION
      - USE CAROUSEL */}
        <div className="container px-6">
          <label className="font-bold md:text-3xl">Promotion</label>
          <PromotionCarousel />
        </div>

        {/* BROWSE OUTLET */}
        <div className=" container p-6">
          <div className="flex justify-between">
            <label className="font-bold md:text-3xl">Outlet</label>
            <label className="font-light text-main_green text-sm underline cursor-pointer">
              View all
            </label>
          </div>

          <div className=" ">
            <ScrollArea className="whitespace-nowrap rounded-md  bg-[#f4f4f4]">
              <div className="flex w-max space-x-4 p-4">
                <Card className="w-52 md:w-96 rounded-xl bg-[#f4f4f4] shadow-md">
                  <CardHeader className="">
                    <Image alt="" src={thumbnail} />
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold md:text-xl">Kucekin Pogung baru</p>
                    <div>
                      <p className=" font-extralight text-sm -py">
                        Jogja <span className="border h-0 mr-1"></span>3.8km
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="w-52 md:w-96 rounded-xl bg-[#f4f4f4] shadow-md">
                  <CardHeader className="">
                    <Image alt="" src={thumbnail} />
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold md:text-xl">Kucekin Pogung baru</p>
                    <div>
                      <p className=" font-extralight text-sm -py">
                        Jogja <span className="border h-0 mr-1"></span>3.8km
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="w-52 md:w-96 rounded-xl bg-[#f4f4f4] shadow-md">
                  <CardHeader className="">
                    <Image alt="" src={thumbnail} />
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold md:text-xl">Kucekin Pogung baru</p>
                    <div>
                      <p className=" font-extralight text-sm -py">
                        Jogja <span className="border h-0 mr-1"></span>3.8km
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="w-52 md:w-96 rounded-xl bg-[#f4f4f4] shadow-md">
                  <CardHeader className="">
                    <Image alt="" src={thumbnail} />
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold md:text-xl">Kucekin Pogung baru</p>
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

        {/* ABOUT US */}
        <div className="flex flex-col gap-4 bg-[#ECE5C7]">
          <div className="container px-6 py-6 md:gap-4 md:flex md:flex-row">
            <div className="md:flex md:flex-col md:gap-7 md:w-[1000px]">
              <p className="text-main_green font-bold text-center md:text-left md:text-3xl">
                Why Kucekin?
              </p>
              <h1 className="text-2xl font-bold text-center md:text-8xl md:w-[700px] md:text-left">
                We Handle Your Laundry, You Handle Your Life.
              </h1>
              <p className=" text-center font-extralight md:font-normal md:w-[700px] md:text-left">
                Kucekin has been delivering fresh, clean clothes since 2023.
                Enjoy hassle-free laundry with our convenient service, saving
                you time and effort. Experience the ease and reliability of
                Kucekin today.
              </p>
            </div>
            <div className=" rounded-xl overflow-hidden shadow-xl hidden md:block">
              <Image alt="image" src={image1} />
            </div>
          </div>
        </div>

        <div className=" container p-6 md:grid md:grid-cols-4 md:gap-4 ">
          <div className="grid grid-cols-4 gap-4 mt-6 md:flex md:flex-col md:items-center">
            <div className="w-20 h-20 md:w-52 md:h-52 p-4  bg-secondary_green rounded-full md:place-content-center">
              <Image
                alt=""
                src={laundryIcon}
                className="mx-auto md:object-fill"
              />
            </div>

            <p className="text-sm md:text-lg text-wrap col-span-3 text-left md:text-center place-content-center">
              Kucekin ensures meticulous cleaning with eco-friendly detergents
              for spotless clothes.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6 md:flex md:flex-col md:items-center ">
            <div className="w-20 h-20 md:w-52 p-4 md:h-52 bg-secondary_green rounded-full place-content-center">
              <Image
                alt=""
                src={detergentIcon}
                objectFit="contain"
                className="mx-auto"
              />
            </div>
            <p className="text-sm md:text-lg text-wrap col-span-3 text-left md:text-center place-content-center">
              Kucekin uses eco-friendly detergents for safe, effective, and
              gentle cleaning.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6 md:flex md:flex-col md:items-center">
            <div className="w-20 h-20 md:w-52 p-4 md:h-52 bg-secondary_green rounded-full place-content-center">
              <Image
                alt=""
                src={timerIcon}
                objectFit="contain"
                className="mx-auto"
              />
            </div>
            <p className="text-sm md:text-lg text-wrap col-span-3 text-left md:text-center place-content-center">
              Kucekin guarantees fast turnaround times for all your laundry
              needs.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6 md:flex md:flex-col md:items-center">
            <div className="w-20 h-20 md:w-52 p-4 md:h-52 bg-secondary_green rounded-full place-content-center">
              <Image
                alt=""
                src={deliveryIcon}
                objectFit="contain"
                className="mx-auto"
              />
            </div>
            <p className="text-sm md:text-lg text-wrap col-span-3 text-left md:text-center place-content-center">
              Kucekin provides reliable, door-to-door delivery for your freshly
              cleaned clothes.
            </p>
          </div>
        </div>

        {/* TESTIMONIAL */}
        <div className="container p-6">
          <h1 className=" font-bold text-2xl md:text-4xl text-center">
            Happy <span className="text-main_green">Customer</span> Vibes
          </h1>
          <div>
            <ScrollArea className="whitespace-nowrap rounded-md  bg-[#f4f4f4]">
              <div className="flex w-max space-x-4 p-4">
                <Card className="w-60 md:w-[400px] h-52 md:h-[200px] place-content-center text-center rounded-xl py-2 bg-secondary_green shadow-md">
                  <CardContent className="flex flex-col gap-2">
                    <p className="font-bold md:text-xl">Christoper Handoyo</p>
                    <Separator />
                    <p className=" font-extralight text-sm md:text-lg text-wrap">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical
                    </p>
                  </CardContent>
                </Card>
                <Card className="w-60 md:w-[400px] h-52 md:h-[200px] place-content-center text-center rounded-xl py-2 bg-secondary_green shadow-md">
                  <CardContent className="flex flex-col gap-2">
                    <p className="font-bold md:text-xl">Christoper Handoyo</p>
                    <Separator />
                    <p className=" font-extralight text-sm md:text-lg text-wrap">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical
                    </p>
                  </CardContent>
                </Card>
                <Card className="w-60 md:w-[400px] h-52 md:h-[200px] place-content-center text-center rounded-xl py-2 bg-secondary_green shadow-md">
                  <CardContent className="flex flex-col gap-2">
                    <p className="font-bold md:text-xl">Christoper Handoyo</p>
                    <Separator />
                    <p className=" font-extralight text-sm md:text-lg text-wrap">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical
                    </p>
                  </CardContent>
                </Card>
                <Card className="w-60 md:w-[400px] h-52 md:h-[200px] place-content-center text-center rounded-xl py-2 bg-secondary_green shadow-md">
                  <CardContent className="flex flex-col gap-2">
                    <p className="font-bold md:text-xl">Christoper Handoyo</p>
                    <Separator />
                    <p className=" font-extralight text-sm md:text-lg text-wrap">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical
                    </p>
                  </CardContent>
                </Card>
                <Card className="w-60 md:w-[400px] h-52 md:h-[200px] place-content-center text-center rounded-xl py-2 bg-secondary_green shadow-md">
                  <CardContent className="flex flex-col gap-2">
                    <p className="font-bold md:text-xl">Christoper Handoyo</p>
                    <Separator />
                    <p className=" font-extralight text-sm md:text-lg text-wrap">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical
                    </p>
                  </CardContent>
                </Card>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>

        <Button
          className="bg-main_green text-white p-6 md:text-xl sticky bottom-5  mx-auto font-bold h-8 hover:bg-secondary_green hover:border-b-0"
          onClick={() => {
            Boolean(id) ? router.push('/outlet') : router.push('/login');
          }}
        >
          Kucekin your clothes now <Plus />
        </Button>
      </section>
    </main>
  );
}

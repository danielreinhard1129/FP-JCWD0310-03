'use client';

import emblaCarouselAutoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import React from 'react';
import banner1 from '../../../public/Hubungi Kami (2).png';
import banner2 from '../../../public/Hubungi Kami (3).png';
import banner3 from '../../../public/Hubungi Kami (4).png';
import { Card, CardContent } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

export function PromotionCarousel() {
  const plugin = React.useRef(
    emblaCarouselAutoplay({ delay: 2000, stopOnInteraction: true }),
  );

  const banners = [banner1, banner2, banner3];

  return (
    <div className="z-0">
      <Carousel
        plugins={[plugin.current]}
        className="w-full "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="">
                  <CardContent className="items-center relative justify-center p-6 w-full  h-[100px] md:h-[400px]  rounded-xl text-center ">
                    <div className="w-full h-full z-0">
                      <Image alt="banner" src={banner} fill />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14 size-5 opacity-15" />
        <CarouselNext className="mr-14 size-5 opacity-15" />
      </Carousel>
    </div>
  );
}

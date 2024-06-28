'use client';

import emblaCarouselAutoplay from 'embla-carousel-autoplay';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

const promos = ['promo1', 'promo2', 'promo3'];
export function PromotionCarousel() {
  const plugin = React.useRef(
    emblaCarouselAutoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {promos.map((promo, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="">
                <CardContent className="items-center justify-center p-6  bg-main_green h-[200px] md:h-[400px] rounded-xl text-center text-white place-content-center">
                  <span className="text-4xl text-mythemes-maingreen font-semibold">{promo}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-14 size-5 opacity-15" />
      <CarouselNext className="mr-14 size-5 opacity-15" />
    </Carousel>
  );
}

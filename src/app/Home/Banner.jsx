import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Banner = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full  mb-8 cursor-pointer"
    >
      <CarouselContent className="rounded-sm">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card className="w-full h-[32rem]">
              <CardContent className="flex items-center justify-center p-0 ">
                {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                <img
                  className="aspect-video object-cover w-full"
                  src="https://source.unsplash.com/user/naive_x"
                  alt=""
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Banner;

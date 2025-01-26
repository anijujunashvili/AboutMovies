import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRef } from "react";

const Banner = () => {
  const plugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="w-full">
            <div className="h-[600px]">
              <div className="flex h-full w-full items-center justify-center">
                <img
                  src="../banner.jpg"
                  className="hidden h-full w-full object-cover md:block"
                />
                <img
                  src="../banner_mob.jpg"
                  className="block h-full w-full object-cover md:hidden"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
};

export default Banner;

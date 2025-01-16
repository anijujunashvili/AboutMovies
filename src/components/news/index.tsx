import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const MovieNews = ({
  headline,
  orientation,
}: {
  headline: string;
  orientation: "vertical" | "horizontal";
}) => {
  const orient = !orientation ? "horizontal" : orientation;
  const contentStyle =
    orientation === "vertical"
      ? "h-[150px] w-full space-x-6 pl-0"
      : "h-[150px] w-1/3 space-x-6 ";
  return (
    <div className="mb-14 mt-10 flex">
      <div className="mx-auto w-full flex-col space-y-6 px-4 md:w-5/6">
        <div>
          <h3 className="text-secondary border-primary dark:text-muted-foreground dark:border-primary-foreground mb-3 border-l-4 pl-2 text-3xl font-bold">
            {headline}
          </h3>
        </div>

        <Carousel
          orientation={orient}
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className={contentStyle}>
            {Array.from({ length: 12 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="relative h-full cursor-pointer space-y-3"
              >
                <div className="flex flex-row space-x-3">
                  <div className="w-1/3">
                    <img
                      src="https://gizmodo.com/app/uploads/2025/01/shrek.jpg"
                      className="rounded-md"
                    />
                  </div>
                  <div className="mr-3 w-2/3 space-y-3">
                    <h4 className="font-semibold hover:underline">
                      Universal Shuffles Shrek and the Minions Around for Its
                    </h4>
                    <span className="text-xs">11 jan</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-2 dark:text-white" />
          <CarouselNext className="right-0 dark:text-white" />
        </Carousel>
      </div>
    </div>
  );
};

export default MovieNews;

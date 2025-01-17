import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Database } from "@/supabase/supabase.types";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { shortenText } from "@/utils";
import "dayjs/locale/ka";

const MovieNews = ({
  headline,
  orientation,
  news,
}: {
  headline: string;
  orientation: "vertical" | "horizontal";
  news: Database["public"]["Tables"]["news"]["Row"][];
}) => {
  const { lang } = useParams();
  const orient = !orientation ? "horizontal" : orientation;
  const contentStyle =
    orientation === "vertical"
      ? "h-[150px] w-full space-x-6 pl-0"
      : "h-[150px] w-1/3 space-x-6 ";
  return (
    <div className="mb-14 mt-10 flex">
      <div className="mx-auto w-full flex-col space-y-6 px-4 md:w-5/6">
        <div>
          <h3 className="text-secondary border-primary mb-4 border-l-4 pl-3 text-3xl font-bold">
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
            {news?.map((n) => (
              <CarouselItem
                key={n.id}
                className="relative h-full cursor-pointer space-y-3 pr-2"
              >
                <div className="flex flex-row space-x-3 border-r">
                  <div className="w-1/3">
                    <img
                      src={import.meta.env.VITE_SUPABASE_STORAGE_URL + n.image}
                      className="rounded-md dark:border"
                    />
                  </div>
                  <div className="mr-3 w-2/3 space-y-3">
                    <h4 className="text-sm font-semibold hover:underline dark:text-white">
                      {lang === "ka"
                        ? shortenText(String(n.title_ka), 100)
                        : shortenText(String(n.title_en), 80)}
                    </h4>
                    <span className="text-xs text-gray-600">
                      {dayjs(n.created_at).locale(`${lang}`).format("DD MMM")}
                    </span>
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

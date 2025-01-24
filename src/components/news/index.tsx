import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Database } from "@/supabase/supabase.types";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { shortenText } from "@/utils";
import "dayjs/locale/ka";
import { APP_PATHS } from "@/routes/enum";

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
  const navigate = useNavigate();
  const contentStyle =
    orientation === "vertical"
      ? "basis-full w-full space-x-6 pl-0 "
      : "basis-full md:basis-1/2 lg:w-1/3 md:w-1/2 space-x-6 ";
  const handleNavigate = (id: number) => {
    const newsPath = `/${lang}/${APP_PATHS.NEWS}/${id}`;
    navigate(newsPath);
  };
  const hStyles =
    lang === "ka"
      ? "text-secondary font-primaryRegular border-primary mb-4 border-l-4 pl-3 pt-1 text-3xl font-bold"
      : "text-secondary uppercase border-primary mb-4 border-l-4 pl-3 pt-1 text-3xl font-bold";
  return (
    <div className="mb-14 mt-10 flex">
      <div className="mx-auto w-full space-y-6 px-4 lg:w-5/6">
        <div>
          <h3 className={hStyles}>{headline}</h3>
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
                onClick={() => handleNavigate(n.id)}
              >
                <div className="grid grid-cols-3 space-x-3 border-r dark:border-gray-700">
                  <div className="col-span-1 grid h-[100px] overflow-hidden rounded-sm">
                    <img
                      src={import.meta.env.VITE_SUPABASE_STORAGE_URL + n.image}
                      className="h-full shrink-0 object-cover dark:border dark:border-gray-700"
                    />
                  </div>
                  <div className="col-span-2 grid">
                    <h4 className="dark:text-secondary text-sm font-semibold hover:underline">
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

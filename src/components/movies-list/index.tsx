import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { useGetMoviesHome } from "@/react-query/query/movies";
import { APP_PATHS } from "@/routes/enum";
import { shortenText } from "@/utils";
import { useAtom } from "jotai";
import { meAtom } from "@/store/auth";
import UserRating from "./user-rating";

const MoviesList = ({ headline }: { headline: string }) => {
  const [me] = useAtom(meAtom);
  const { lang } = useParams();

  const { data: Movies } = useGetMoviesHome(me?.id);
  const hStyles =
    lang === "ka"
      ? "text-secondary font-primaryRegular border-primary border-l-4 pl-3 pt-1 text-3xl font-bold"
      : "text-secondary uppercase border-primary border-l-4 pl-3 pt-1 text-3xl font-bold";
  return (
    <div className="mb-14 mt-6 flex lg:mt-10">
      <div className="mx-auto w-full flex-col space-y-10 px-4 lg:w-5/6">
        <h3 className={hStyles}>{headline}</h3>
        <Carousel
          orientation="horizontal"
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="w-full space-x-4">
            {Movies?.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="shadow-sx basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
                  <Link to={`/${lang}/${APP_PATHS.MOVIES}/${movie.id}`}>
                    <div className="h-[240px] md:h-[350px]">
                      <img
                        className="mx-auto h-full w-full shrink-0 rounded-t-lg object-cover"
                        src={
                          import.meta.env.VITE_SUPABASE_STORAGE_URL +
                          movie.image
                        }
                        alt=""
                      />
                    </div>
                  </Link>
                  <div className="p-3 md:p-5">
                    <div className="mb-4 flex flex-row items-center space-x-4">
                      <div className="flex flex-row gap-1">
                        <Star
                          size={20}
                          className="text-primary"
                          fill="#ffc300"
                        />
                        <span className="dark:text-white">
                          {movie?.rating_count > 0
                            ? (movie?.rating_sum / movie?.rating_count).toFixed(
                                1,
                              )
                            : 0}
                        </span>
                      </div>
                      <UserRating
                        rating={movie?.userRating}
                        mid={movie?.id}
                        nameKa={movie?.name_ka}
                        nameEn={movie?.name_en}
                        rSum={movie?.rating_sum}
                        rCount={movie?.rating_count}
                      />
                    </div>
                    <Link to={`/${lang}/${APP_PATHS.MOVIES}/${movie.id}`}>
                      <h5 className="md:text-md mb-2 text-sm font-semibold tracking-tight text-gray-900 hover:underline dark:text-white">
                        {lang == "ka"
                          ? shortenText(String(movie.name_ka), 20)
                          : shortenText(String(movie.name_en), 20)}
                      </h5>
                    </Link>
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

export default MoviesList;

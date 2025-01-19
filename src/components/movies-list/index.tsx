import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import StarRatings from "react-star-ratings";
import { useState } from "react";
import { useGetMoviesHome } from "@/react-query/query/movies";
import { APP_PATHS } from "@/routes/enum";
import { shortenText } from "@/utils";
import { Button } from "../ui/button";
import { useAtom } from "jotai";
import { meAtom } from "@/store/auth";
import { useRateMovie } from "@/react-query/mutation/movies";
import SuccessMsg from "@/components/success-message";
import { lastRatedType } from "@/types/movies";

const MoviesList = ({ headline }: { headline: string }) => {
  const [me] = useAtom(meAtom);
  const [star, setStar] = useState(0);
  const [lastRated, setLastRated] = useState<lastRatedType>({
    rated: false,
    id: 0,
    value: 0,
  });
  const { lang } = useParams();
  const { data: Movies, refetch: refetchMovies } = useGetMoviesHome(me?.id);

  const { mutate: rateMovie } = useRateMovie();
  const handleRate = (mid: number, rcount: number, rsum: number) => {
    if (me?.id) {
      const payload = {
        m_id: mid,
        rate: star,
        user_id: me?.id,
        rating_count: rcount,
        rating_sum: rsum,
      };
      if (star > 0) {
        rateMovie(payload);
        setStar(0);
        refetchMovies();
        setLastRated({ rated: true, id: mid, value: star });
      }
    }
  };
  return (
    <div className="mb-14 mt-6 flex lg:mt-10">
      <div className="mx-auto w-full flex-col space-y-10 px-4 lg:w-5/6">
        <h3 className="text-secondary font-primaryRegular border-primary border-l-4 pl-3 pt-1 text-3xl font-bold">
          {headline}
        </h3>
        <Carousel
          orientation="horizontal"
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="w-full">
            {Movies?.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="shadow-sx basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
                  <Link to={`/${lang}/${APP_PATHS.MOVIES}/${movie.id}`}>
                    <img
                      className="mx-auto h-[350px] w-full rounded-t-lg md:h-[300px]"
                      src={
                        import.meta.env.VITE_SUPABASE_STORAGE_URL + movie.image
                      }
                      alt=""
                    />
                  </Link>
                  <div className="p-5">
                    <div className="mb-4 flex flex-row items-center space-x-4">
                      <div className="flex flex-row gap-1">
                        <Star
                          size={20}
                          className="text-primary"
                          fill="#ffc300"
                        />
                        <span className="dark:text-white">
                          {(movie?.rating_sum / movie?.rating_count).toFixed(1)}
                        </span>
                      </div>
                      <div className="">
                        {movie?.userRating > 0 || lastRated.id === movie.id ? (
                          <div className="flex flex-row gap-1">
                            <Star
                              size={20}
                              className="text-secondary fill-secondary cursor-pointer"
                              fill="#283b7b"
                            />
                            <span className="dark:text-white">
                              {movie?.userRating > 0
                                ? movie?.userRating
                                : lastRated.value}
                            </span>
                          </div>
                        ) : (
                          <Dialog>
                            <DialogTrigger>
                              <Star
                                size={20}
                                className="text-secondary cursor-pointer"
                              />
                            </DialogTrigger>
                            <DialogContent className="justify-center text-center dark:border-gray-800">
                              {lastRated.rated && lastRated.id === movie.id ? (
                                <SuccessMsg
                                  lgText="layout.rated"
                                  smText=""
                                  btnName=""
                                  type="rate"
                                />
                              ) : (
                                <>
                                  <DialogHeader>
                                    <DialogTitle className="text-center"></DialogTitle>
                                    <DialogDescription className="dark:text-secondary text-center text-2xl font-bold text-black">
                                      {lang == "ka"
                                        ? movie.name_ka
                                        : movie.name_en}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div>
                                    <StarRatings
                                      numberOfStars={10}
                                      changeRating={(rating) => {
                                        setStar(rating);
                                      }}
                                      rating={star}
                                      name="rating"
                                      starDimension="20px"
                                      starSpacing="4px"
                                      starHoverColor="#283b7b"
                                      starRatedColor="#283b7b"
                                    />
                                  </div>
                                  <div className="my-4 flex justify-center">
                                    <Button
                                      className="bg-primary w-1/2 rounded-full dark:text-white"
                                      onClick={() =>
                                        handleRate(
                                          movie.id,
                                          Number(movie?.rating_count),
                                          Number(movie.rating_sum),
                                        )
                                      }
                                    >
                                      Rate
                                    </Button>
                                  </div>
                                </>
                              )}
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                    <Link to={`/${lang}/${APP_PATHS.MOVIES}/${movie.id}`}>
                      <h5 className="text-md mb-2 font-semibold tracking-tight text-gray-900 hover:underline dark:text-white">
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

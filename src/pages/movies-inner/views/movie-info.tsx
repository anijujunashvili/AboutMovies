import { useGetMovieInfo } from "@/react-query/query/movies";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/ka";
import { Star } from "lucide-react";
import { useGetMovieActors } from "@/react-query/query/actors";
import MovieActors from "./movie-actors";
import { movieAct } from "@/types/actors";
import MovieGenres from "./movies-genres";
import { useTranslation } from "react-i18next";

const MovieInfo = () => {
  const { lang, id } = useParams();
  const { t } = useTranslation();

  const { data: info } = useGetMovieInfo(Number(id));
  const rating =
    info?.rating_sum && info.rating_count
      ? info?.rating_sum / info?.rating_count
      : 0;
  const { data: actors } = useGetMovieActors(Number(id));

  return (
    <>
      <div className="mb-10 flex flex-col">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex flex-col gap-1">
            <div className="dark:text-secondary font-primaryRegular text-4xl font-bold">
              {lang == "ka" ? info?.name_ka : info?.name_en}
            </div>
            <span className="text-sm text-gray-700">
              {dayjs(info?.release_date).format("YYYY")}
            </span>
          </div>
          <div className="flex flex-col justify-end space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex flex-col">
              <div className="dark:text-secondary text-left text-sm text-gray-700 md:text-right">
                {t("movies.user_rating")}
              </div>
              <div className="dark:text-secondary flex flex-row gap-2 text-gray-700 md:justify-end">
                <Star size={20} className="text-primary" fill="#ffc300" />
                <span>{rating.toFixed(1)} / 10</span>
              </div>
            </div>

            <div className="">
              <div className="dark:text-secondary text-left text-sm text-gray-700 md:text-right">
                {t("movies.your_rating")}
              </div>
              <div className="text-md dark:text-secondary flex flex-row gap-2 text-gray-700 md:justify-end">
                <Star
                  size={20}
                  className="text-secondary dark:fill-secondary cursor-pointer"
                  fill="#283b7b"
                />
                <span>{rating.toFixed(1)} / 10</span>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4 flex flex-col gap-6 md:flex-row">
          <div className="flex md:w-1/3">
            <img
              src={import.meta.env.VITE_SUPABASE_STORAGE_URL + info?.image}
              className="rounded-sm"
            />
          </div>

          <div className="flex cursor-pointer flex-col space-y-2 md:w-2/3">
            <div className="flex flex-wrap gap-2">
              <MovieGenres />
            </div>

            <div className="flex flex-row flex-wrap gap-2 border-b py-4 dark:border-gray-600">
              <div className="dark:text-secondary font-normal">
                {t("movies.stars")}
              </div>
              <div className="flex gap-2">
                <MovieActors actors={actors as movieAct[]} />
              </div>
            </div>
            <div className="flex flex-row gap-2 border-b py-4 dark:border-gray-600">
              <div className="dark:text-secondary font-normal">
                {t("movies.nominations")}
              </div>
              <div className="dark:text-secondary font-bold">
                {info?.nomination}
              </div>
            </div>
            <div className="flex flex-row gap-2 border-b py-4 dark:border-gray-600">
              <div className="dark:text-secondary font-normal">
                {t("movies.wins")}
              </div>
              <div className="dark:text-secondary font-bold">
                {info?.awards}
              </div>
            </div>
            <div className="flex flex-row gap-2 border-b py-4 dark:border-gray-600">
              <div className="dark:text-secondary font-normal">
                {t("movies.oscars")}
              </div>
              <div className="dark:text-secondary font-bold">
                {info?.oscars}
              </div>
            </div>
            <div className="flex flex-row gap-2 border-b py-4 dark:border-gray-600">
              <div className="dark:text-secondary font-normal">
                {t("movies.release_dt")}
              </div>
              <div className="dark:text-secondary font-bold">
                {dayjs(info?.release_date)
                  .locale(`${lang}`)
                  .format("DD MMM, YYYY")}
              </div>
            </div>
          </div>
        </div>
        <div className="text-md dark:text-secondary mb-6 mt-2 text-gray-700">
          {lang === "ka" ? info?.description_ka : info?.description_en}
        </div>
        <div>
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/O1nDozs-LxI"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;

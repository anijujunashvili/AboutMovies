import { useGetMovieInfo } from "@/react-query/query/movies";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Star } from "lucide-react";
import { useGetMovieActors } from "@/react-query/query/actors";
import MovieActors from "./movie-actors";
import { movieAct } from "@/types/actors";
import MovieGenres from "./movies-genres";

const MovieInfo = () => {
  const { lang, id } = useParams();

  const { data: info } = useGetMovieInfo(Number(id));
  const rating =
    info?.rating_sum && info.rating_count
      ? info?.rating_sum / info?.rating_count
      : 0;
  const { data: actors } = useGetMovieActors(Number(id));

  return (
    <>
      <div className="mb-10 flex flex-col">
        <div className="flex flex-row justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-4xl">
              {lang == "ka" ? info?.name_ka : info?.name_en}
            </div>
            <span className="text-sm text-gray-700">
              {dayjs(info?.release_date).format("YYYY")}
            </span>
          </div>
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col">
              <div className="text-right text-sm text-gray-700">
                User rating
              </div>
              <div className="flex flex-row gap-2 text-gray-700">
                <Star size={20} className="text-primary" fill="#ffc300" />
                <span>{rating.toFixed(1)} / 10</span>
              </div>
            </div>

            <div className="">
              <div className="text-right text-sm text-gray-700">
                Your rating
              </div>
              <div className="text-md flex flex-row gap-2 text-gray-700">
                <Star
                  size={20}
                  className="text-secondary cursor-pointer"
                  fill="#283b7b"
                />
                <span>{rating.toFixed(1)} / 10</span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 flex flex-row gap-6">
          <div className="flex w-1/3">
            <img
              src={import.meta.env.VITE_SUPABASE_STORAGE_URL + info?.image}
              className="rounded-sm"
            />
          </div>

          <div className="flex w-2/3 cursor-pointer flex-col space-y-2">
            <div className="flex flex-wrap gap-2">
              <MovieGenres />
            </div>

            <div className="flex flex-row flex-wrap gap-2 border-b py-4">
              <div className="font-semibold">Stars</div>
              <div className="flex gap-2">
                <MovieActors actors={actors as movieAct[]} />
              </div>
            </div>
            <div className="flex flex-row gap-2 border-b py-4">
              <div className="font-semibold">total nominations</div>
              <div className="text-secondary">{info?.nomination}</div>
            </div>
            <div className="flex flex-row gap-2 border-b py-4">
              <div className="font-semibold">Wins</div>
              <div className="text-secondary">{info?.awards}</div>
            </div>
            <div className="flex flex-row gap-2 border-b py-4">
              <div className="font-semibold">Oscars</div>
              <div className="text-secondary">{info?.oscars}</div>
            </div>
            <div className="flex flex-row gap-2 border-b py-4">
              <div className="font-semibold">Release date</div>
              <div className="text-secondary">{info?.release_date}</div>
            </div>
          </div>
        </div>
        <div className="text-md mb-6 mt-2 text-gray-700">
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

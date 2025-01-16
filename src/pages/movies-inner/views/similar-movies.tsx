import { Card } from "@/components/ui/card";
import { shortenText } from "@/utils";
import { Link, useParams } from "react-router-dom";
import { useGetSimilarMoviesList } from "@/react-query/query/movies";
import dayjs from "dayjs";
import { APP_PATHS } from "@/routes/enum";

const SimilarMovies = () => {
  const { id, lang } = useParams();

  const { data } = useGetSimilarMoviesList(Number(id));

  return (
    <>
      <div className="flex flex-col">
        <div>
          <h3 className="text-secondary border-primary mt-2 border-l-4 pl-3 text-3xl font-bold">
            Similar Movies
          </h3>
        </div>
        <div className="my-10 flex flex-col space-y-4">
          {data?.map((m) => {
            return (
              <Card key={m.g_id}>
                <div className="grid h-full grid-cols-4 gap-4 p-1">
                  <div className="col-span-1 grid h-full">
                    <img
                      src={
                        import.meta.env.VITE_SUPABASE_STORAGE_URL +
                        m.movies.image
                      }
                      className="rounded-sm"
                    />
                  </div>
                  <div className="col-span-3 grid">
                    <div className="text-md cursor-pointer pt-1 font-semibold">
                      <Link
                        to={
                          "/" +
                          lang +
                          "/" +
                          APP_PATHS.MOVIES +
                          "/" +
                          m.movies.id
                        }
                      >
                        <span className="hover:underline">
                          {lang === "ka"
                            ? shortenText(m.movies.name_ka, 50)
                            : shortenText(m.movies.name_en, 50)}
                        </span>
                      </Link>
                      <Link to={APP_PATHS.MOVIES + "/" + m.movies.id}>
                        <p className="pt-1 text-xs font-normal text-gray-600 hover:underline">
                          {lang === "ka"
                            ? shortenText(m.movies.description_ka, 100)
                            : shortenText(m.movies.description_en, 100)}
                        </p>
                      </Link>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {dayjs(m.movies.release_date).format("YYYY")}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SimilarMovies;

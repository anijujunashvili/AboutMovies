import { Card } from "@/components/ui/card";
import { shortenText } from "@/utils";
import { Link, useParams } from "react-router-dom";
import { useGetSimilarMoviesList } from "@/react-query/query/movies";
import dayjs from "dayjs";
import { APP_PATHS } from "@/routes/enum";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "@/components/ui/scroll-area";

const SimilarMovies = () => {
  const { id, lang } = useParams();
  const { t } = useTranslation();

  const { data } = useGetSimilarMoviesList(Number(id));
  const movieLink = `/${lang}/${APP_PATHS.MOVIES}/`;

  return (
    <>
      <div className="flex flex-col">
        <div className="border-primary flex items-center border-l-4 pl-3">
          <h3 className="text-secondary font-primaryRegular dark:text-secondary pt-1 text-3xl font-bold uppercase">
            {t("movies.similar")}
          </h3>
        </div>

        <div className="mb-6 mt-10">
          <ScrollArea className="h-screen w-full">
            {data
              ?.filter(
                (value, index, self) =>
                  index === self.findIndex((t) => t.id === value.id),
              )
              .map((m) => {
                if (m.id === Number(id)) return;
                return (
                  <Card key={m.id} className="mb-4">
                    <div className="grid h-full grid-cols-4 gap-4 p-1">
                      <div className="col-span-1 grid h-full">
                        <img
                          src={
                            import.meta.env.VITE_SUPABASE_STORAGE_URL + m.image
                          }
                          className="rounded-sm"
                        />
                      </div>
                      <div className="col-span-3 grid">
                        <div className="text-md cursor-pointer pt-1 font-semibold">
                          <Link
                            to={
                              "/" + lang + "/" + APP_PATHS.MOVIES + "/" + m.id
                            }
                          >
                            <span className="hover:underline">
                              {lang === "ka"
                                ? shortenText(m.name_ka, 50)
                                : shortenText(m.name_en, 50)}
                            </span>
                          </Link>
                          <Link to={movieLink + m.id}>
                            <p className="pt-1 text-xs font-normal text-gray-600 hover:underline">
                              {lang === "ka"
                                ? shortenText(m.description_ka, 100)
                                : shortenText(m.description_en, 100)}
                            </p>
                          </Link>
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {dayjs(m.release_date).format("YYYY")}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default SimilarMovies;

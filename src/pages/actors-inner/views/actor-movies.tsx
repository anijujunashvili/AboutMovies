import { Card } from "@/components/ui/card";
import { shortenText } from "@/utils";
import { Link, useParams } from "react-router-dom";
import { useGetActorMoviesList } from "@/react-query/query/actors";
import dayjs from "dayjs";
import { APP_PATHS } from "@/routes/enum";
import { useTranslation } from "react-i18next";

const ActorMovies = () => {
  const { id, lang } = useParams();
  const { t } = useTranslation();

  const { data } = useGetActorMoviesList(Number(id));

  return (
    <>
      <div className="flex flex-col">
        <div>
          <h3 className="text-secondary border-primary mt-2 border-l-4 pl-3 text-3xl font-bold">
            {t("actor.movies")}
          </h3>
        </div>
        <div className="my-10 flex flex-col space-y-4">
          {data
            ?.filter(
              (value, index, self) =>
                index === self.findIndex((t) => t.id === value.id),
            )
            .map((m) => {
              if (m.id === Number(id)) return;
              return (
                <Card key={m.id}>
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
                          to={"/" + lang + "/" + APP_PATHS.MOVIES + "/" + m.id}
                        >
                          <span className="hover:underline">
                            {lang === "ka"
                              ? shortenText(m.name_ka, 50)
                              : shortenText(m.name_en, 50)}
                          </span>
                        </Link>
                        <Link to={APP_PATHS.MOVIES + "/" + m.id}>
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
        </div>
      </div>
    </>
  );
};

export default ActorMovies;

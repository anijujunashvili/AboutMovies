import { Badge } from "@/components/ui/badge";
import { useGetMovieGenres } from "@/react-query/query/genres";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MovieGenres = () => {
  const { id, lang } = useParams();
  const { t } = useTranslation();

  const { data: genres, isPending } = useGetMovieGenres(Number(id));

  return (
    <>
      {isPending && t("layout.loading")}
      {genres?.map((g) => {
        return (
          <Badge key={g.id} className="dark:text-white">
            {lang == "ka" ? g.genres.name_ka : g.genres.name_en}
          </Badge>
        );
      })}
    </>
  );
};

export default MovieGenres;

import { Badge } from "@/components/ui/badge";
import { useGetMovieGenres } from "@/react-query/query/genres";
import { useParams } from "react-router-dom";

const MovieGenres = () => {
  const { id, lang } = useParams();

  const { data: genres } = useGetMovieGenres(Number(id));

  return (
    <>
      {genres?.map((g) => {
        return (
          <Badge key={g.id}>
            {lang == "ka" ? g.genres.name_ka : g.genres.name_en}
          </Badge>
        );
      })}
    </>
  );
};

export default MovieGenres;

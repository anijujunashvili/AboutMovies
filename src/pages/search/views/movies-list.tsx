import { moviesWithPagType } from "@/types/movies";
import { useParams } from "react-router-dom";

type propsType = {
  movies: moviesWithPagType[] | undefined;
};

const MoviesListForSerach: React.FC<propsType> = ({ movies }) => {
  const { lang } = useParams();
  return (
    <>
      {movies?.map((m) => (
        <div key={m.id} className="mb-6 flex max-h-[300px] w-[30%] flex-col">
          <img
            src={import.meta.env.VITE_SUPABASE_STORAGE_URL + m.image}
            className="max-h-[300px]"
          />
          <span>{lang == "ka" ? m.name_ka : m.name_en}</span>
        </div>
      ))}
      {movies && movies?.length < 1 && <div>Data not found</div>}
    </>
  );
};

export default MoviesListForSerach;

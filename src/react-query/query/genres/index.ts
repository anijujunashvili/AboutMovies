import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../enum";
import { getMovieGenres } from "@/supabase/genres";

export const useGetMovieGenres = (m_id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_GENRES, m_id],
    queryFn: () => getMovieGenres(m_id),
  });
};

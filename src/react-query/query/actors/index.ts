import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../enum";
import { getActors, getMovieActors } from "@/supabase/actors";

export const useGetActors = () => {
  const { data: actorsList } = useQuery({
    queryKey: [QUERY_KEYS.GET_ACTORS],
    queryFn: getActors,
  });
  return actorsList;
};

export const useGetMovieActors = (m_id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_ACTORS, m_id],
    queryFn: () => getMovieActors(m_id),
  });
};

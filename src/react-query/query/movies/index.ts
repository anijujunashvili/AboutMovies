import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../enum";
import {
  getMovies,
  getPagMovies,
  getUserRatedMovies,
  getMovieInfo,
  getSimilarMoviesList,
  getMoviesHome,
  getIfMovieIsRatedByUser,
} from "@/supabase/movies";

export const useGetMovies = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIES],
    queryFn: getMovies,
  });
};

export const useGetIfMovieIsRatedByUser = (user_id: string, m_id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RATING, user_id, m_id],
    queryFn: () => getIfMovieIsRatedByUser(user_id, m_id),
    select: (data) => {
      if (data) return data[0];
    },
  });
};

// vtestav mtavarze marto

export const useGetMoviesHome = (user_id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIES, user_id],
    queryFn: () => getMoviesHome(user_id),
  });
};

// vtestav mtavarze marto

export const useGetMovieInfo = (m_id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_INFO, m_id],
    queryFn: () => getMovieInfo(m_id),
  });
};

export const useGetUserRatedMovies = (user_id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_RATED_MOVIES, user_id],
    queryFn: () => getUserRatedMovies(user_id),
  });
};

export const useGetPagMovies = (from: number, to: number) => {
  const key = from + "" + to;
  const { data: moviesList, isPending } = useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIES, key],
    queryFn: () => getPagMovies(from, to),
  });

  return { moviesList, isPending };
};

export const useGetSimilarMoviesList = (m_id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SIMILAR_MOVIES, m_id],
    queryFn: () => getSimilarMoviesList(m_id),
  });
};

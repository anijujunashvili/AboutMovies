import { movieType } from "@/types/search";
import { mapedMovieType, MoviesWithRatingType } from "@/types/movies";
import { MapedActorType } from "@/types/actors";

import { Tables } from "../supabase.types";

export const orderMovieList = (arr: movieType[] | undefined) => {
  const newArr = arr?.map((a) => {
    return {
      ...a,
      rating: a.rating_sum / a.rating_count,
    };
  });

  return newArr as mapedMovieType[];
};

export const searchWithPag = (
  arr: Tables<"movies">[] | Tables<"actors">[] | undefined,
  count: number | null,
) => {
  const newArr = arr?.map((a) => {
    return {
      ...a,
      count: count,
    };
  });

  return newArr as mapedMovieType[] | MapedActorType[];
};

export const moviesWithUserRatings = (
  movies: Tables<"movies">[] | null,
  userRatings: Tables<"user_ratings">[] | null,
) => {
  const newArray = movies?.map((m) => {
    const rat = userRatings?.find((item) => {
      return item.m_id === m.id ? item.rating : 0;
    });

    return {
      ...m,
      userRating: rat ? rat.rating : 0,
    };
  });

  return newArray as MoviesWithRatingType[];
};

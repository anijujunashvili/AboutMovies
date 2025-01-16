import { movieType } from "@/types/search";
import { mapedMovieType } from "@/types/movies";
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

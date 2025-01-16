import { movieType } from "@/types/search";
import { mapedMovieType } from "@/types/movies";
import { actorType, MapedActorType } from "@/types/actors";

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
  arr: movieType[] | actorType[] | undefined,
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

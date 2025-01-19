import { supabase } from "..";
import { searchWithPag, moviesWithUserRatings } from "../utils";
import {
  moviesWithPagType,
  moviesRateType,
  Movies,
  MoviesWithRatingType,
} from "@/types/movies";
import { Tables } from "../supabase.types";

export const getMovies = async () => {
  try {
    const result = await supabase.from("movies").select("*");
    // const orderedData = result?.data
    //   ? orderMovieList(result?.data)
    //   : result?.data;

    return result?.data as Tables<"movies">[];
  } catch (error) {
    console.log("Error during get movies list", error);
  }
};

// vtestav mtavarze marto

export const getMoviesHome = async (user_id?: string | undefined) => {
  try {
    const result = await supabase.from("movies").select("*");

    // if (result.data && typeof user_id !== "undefined") {
    //   console.log(1);
    const ratings = await supabase
      .from("user_ratings")
      .select("*")
      .eq("user_id", String(user_id));
    // if (ratings.data) {
    const withRating = moviesWithUserRatings(result?.data, ratings.data);
    return withRating as MoviesWithRatingType[];
    //   }
    // } else {
    //   console.log(2);
    //   return result?.data as Tables<"movies">[];
    // }
  } catch (error) {
    console.log("Error during get movies list", error);
  }
};

// vtestav mtavarze marto

export const getMovieInfo = async (m_id: number) => {
  try {
    const result = await supabase.from("movies").select("*").eq("id", m_id);

    const orderedData = result?.data ? result?.data[0] : result;

    return orderedData as Tables<"movies">;
  } catch (error) {
    console.log("Error during get movies list", error);
  }
};

export const getUserRatedMovies = async (user_id: string) => {
  try {
    const result = await supabase
      .from("user_ratings")
      .select("*")
      .eq("user_id", user_id);

    return result.data as Tables<"user_ratings">[];
  } catch (error) {
    console.log("Error during get movies list", error);
  }
};

export const getPagMovies = async (from: number, to: number) => {
  try {
    const result = await supabase
      .from("movies")
      .select("*", { count: "exact" })
      .range(from, to);
    const orderedData = result?.data
      ? searchWithPag(result?.data, result?.count)
      : result?.data;

    return orderedData as moviesWithPagType[];
  } catch (error) {
    console.log("Error during get movies list", error);
  }
};

export const rateMovie = async (payload: moviesRateType) => {
  try {
    const newCount = payload.rating_count + 1;
    const newSum = payload.rating_sum + payload.rate;
    return await supabase
      .from("movies")
      .update({
        rating_sum: newCount,
        rating_count: newSum,
      })
      .match({ id: payload.m_id })
      .then(() => {
        return supabase.from("user_ratings").upsert([
          {
            user_id: payload.user_id,
            m_id: payload.m_id,
            rating: payload.rate,
          },
        ]);
      });
  } catch (error) {
    console.log("error during rate movies", error);
  }
};

export const getSimilarMoviesList = async (m_id: number) => {
  try {
    const result = await supabase
      .from("movie_genres")
      .select("g_id")
      .eq("m_id", m_id);

    const genresArray = result?.data?.map((a) => a.g_id);

    const movies = await supabase
      .from("movie_genres")
      .select(
        "g_id,movies(id,name_ka,name_en,description_ka,description_en,image,release_date)",
      )
      .filter("id", "in", `(${genresArray})`);

    const moviesArray = movies.data?.map((genre) => genre.movies);

    return moviesArray as Movies[] | undefined;
  } catch (error) {
    console.log("Error during get movies list", error);
  }
};

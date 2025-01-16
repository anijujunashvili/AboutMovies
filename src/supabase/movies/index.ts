import { supabase } from "..";
import { searchWithPag } from "../utils";
import { moviesWithPagType, moviesRateType } from "@/types/movies";
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
        return supabase
          .from("user_ratings")
          .upsert([
            {
              user_id: payload.user_id,
              m_id: payload.m_id,
              rating: payload.rate,
            },
          ])
          .then((res) => {
            return res;
          });
      });
  } catch (error) {
    console.log("error during rate movies", error);
  }
};

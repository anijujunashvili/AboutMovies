import { supabase } from "..";
import { actorType, movieActorsType } from "@/types/actors";
import { Tables } from "../supabase.types";
import { Movies } from "@/types/movies";

export const getActors = async () => {
  try {
    const result = await supabase.from("actors").select("*");

    return result.data as actorType[];
  } catch (error) {
    console.log("Error during get actors list", error);
  }
};

export const getMovieActors = async (m_id: number) => {
  try {
    const result = await supabase
      .from("movie_actors")
      .select("id,actors(id,name_ka,name_en,image,born)")
      .eq("m_id", m_id);

    const res = result.data ? result.data : result;

    return res as movieActorsType[];
  } catch (error) {
    console.log("Error during get actors list", error);
  }
};

export const getActorInfo = async (act_id: number) => {
  try {
    const result = await supabase.from("actors").select("*").eq("id", act_id);

    const orderedData = result?.data ? result?.data[0] : result;

    return orderedData as Tables<"actors">;
  } catch (error) {
    console.log("Error during get actor info", error);
  }
};

export const getActorMoviesList = async (act_id: number) => {
  try {
    const result = await supabase
      .from("movie_actors")
      .select("m_id")
      .eq("act_id", act_id);

    const moviesArray = result?.data?.map((a) => a.m_id);

    const movies = await supabase
      .from("movies")
      .select("*")
      .filter("id", "in", `(${moviesArray})`);

    return movies.data as Movies[] | undefined;
  } catch (error) {
    console.log("Error during get movies list", error);
  }
};

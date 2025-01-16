import { supabase } from "..";
import { actorType, movieActorsType } from "@/types/actors";

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

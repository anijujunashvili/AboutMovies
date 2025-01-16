import { supabase } from "..";
import { movieGenresType } from "@/types/genres";

export const getMovieGenres = async (m_id: number) => {
  try {
    const result = await supabase
      .from("movie_genres")
      .select("id,genres(id,name_ka,name_en)")
      .eq("m_id", m_id);

    return result.data as movieGenresType[];
  } catch (error) {
    console.log("Error during get reviews list", error);
  }
};
